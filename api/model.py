from datetime import datetime, date, timedelta
from pathlib import Path
from typing import List

import matplotlib.pyplot as plt
import joblib
import yfinance as yf
from prophet import Prophet

# LSTM Dependencies

import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from prisma import Prisma
from prisma.types import StateEpidemicWhereInput
BASE_DIR = Path(__file__).resolve(strict=True).parent
TODAY = date.today()


def train(ticker="MSFT"):
    # data = yf.download("^GSPC", "2008-01-01", TODAY.strftime("%Y-%m-%d"))
    data = yf.download(ticker, "2020-01-01", TODAY.strftime("%Y-%m-%d"))
    data.head()
    data["Adj Close"].plot(title=f"{ticker} Stock Adjusted Closing Price")

    df_forecast = data.copy()
    df_forecast.reset_index(inplace=True)
    df_forecast["ds"] = df_forecast["Date"]
    df_forecast["y"] = df_forecast["Adj Close"]
    df_forecast = df_forecast[["ds", "y"]]
    df_forecast

    model = Prophet()
    model.fit(df_forecast)

    joblib.dump(model, Path(BASE_DIR).joinpath(f"{ticker}.joblib"))


def predict(ticker="MSFT", days=7):
    model_file = Path(BASE_DIR).joinpath(f"{ticker}.joblib")
    if not model_file.exists():
        return False

    model = joblib.load(model_file)

    future = TODAY + timedelta(days=days)

    dates = pd.date_range(start="2020-01-01", end=future.strftime("%m/%d/%Y"),)
    df = pd.DataFrame({"ds": dates})

    forecast = model.predict(df)

    # model.plot(forecast).savefig(f"{ticker}_plot.png")
    # model.plot_components(forecast).savefig(f"{ticker}_plot_components.png")

    # show the forecast

    df_forecast = yf.download(ticker, "2020-01-01", TODAY.strftime("%Y-%m-%d"))
    df_forecast.reset_index(inplace=True)
    df_forecast["ds"] = df_forecast["Date"]
    df_forecast["y"] = df_forecast["Adj Close"]
    df_forecast = df_forecast[["ds", "y"]]

    # plt.figure(figsize=(10, 6))
    # plt.plot(forecast["ds"], forecast["yhat"], label="Forecast")
    # plt.plot(df_forecast["ds"], df_forecast["y"], label="Actual")
    # plt.xlabel("Date")
    # plt.ylabel("Price")
    # plt.title(f"{ticker} Stock Forecast")
    # plt.legend()
    # plt.show()

    return forecast.tail(days).to_dict("records")


def convert(prediction_list):
    output = {}
    for data in prediction_list:
        date = data["ds"].strftime("%m/%d/%Y")
        output[date] = data["trend"]
    return output


async def train_lstm_model(
    recordedAfter: datetime,
    recordedBefore: datetime
    # Parameter 1: Start date of training data
    # Parameter 2: End date of training data
):
    prisma = Prisma()
    prisma.connect()
    recordedAtQuery = StateEpidemicWhereInput(
        date={"gte": recordedAfter, "lte": recordedBefore}
    )

    recordedAtQuery.date["gte"] = recordedAfter if recordedAfter else datetime(
        year=2020, month=1, day=1)
    recordedAtQuery.date["lte"] = recordedBefore if recordedBefore else TODAY

    data = await prisma.stateepidemic.find_many(
        where=recordedAtQuery,
        take=14
    )
    scaler = StandardScaler()
    df = pd.read_csv('../data/consolidated_data/training_dataset.csv')
    print(df)
    df.drop(columns=['Unnamed: 0', 'state'], inplace=True)
    print(df)
    # sum each date for each column sum all 14 rows
    df = df.groupby('date').sum()
    df.index = pd.to_datetime(df.index)
    df = df.asfreq('d')  # changes the frequency to daily
    scaler = scaler.fit(df)
    df_scaled = scaler.transform(df)
    trainX = []  # input
    past = 14  # 14 days in the past
    future = 1  # 1 day in the future
    for i in range(past, len(df_scaled) + 1):  # Sequence for lstm to learn
        trainX.append(df_scaled[i-past:i, 0:df.shape[1]])

    trainX = np.array(trainX)

    return data


if __name__ == "__main__":
    TICKER = "AAPL"
    train(TICKER)
    prediction = predict(TICKER)
    print(convert(prediction))
