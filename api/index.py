import os
import pickle
from typing import Optional
from fastapi import FastAPI, HTTPException, Query, Response
from pydantic import BaseModel
from api.model import convert, predict
from api.src.prisma import prisma
from prisma.types import StateEpidemicWhereInput
import numpy as np
import pandas as pd
import pmdarima as pm
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from datetime import datetime

app = FastAPI()


with open(r"api/model_binaries/LSTM_UNI_model.pkl", "rb") as file:
    model = pickle.load(file)

with open(r"api/model_binaries/random_forest_regression_model.pkl", "rb") as file:
    random_forest_model = pickle.load(file)

with open(r"api/model_binaries/ARIMA_model.pkl", "rb") as file:
    arima_model = pickle.load(file)


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}


@app.get("/api/python/{name}")
async def hello_name(name: str):
    mvac = await prisma.statevaccination.find_first(
        where={
            "state": name
        }
    )
    print(mvac.model_dump())
    return {"message": f"{mvac.model_dump()}"}


@app.get("/api/python/{name}/vaccination")
async def get_vaccination_data(name: str):
    mvac = await prisma.statevaccination.find_first(
        where={
            "state": name
        }
    )
    return {"message": f"{mvac.model_dump()}"}


@app.get("/api/python/lstm_model/{end_date}")
async def get_data_from_end_date(end_date: str):
    # dateObject = datetime.strptime(end_date, "%Y-%m-%d")
    testString = "2021-09-01"
    testDateObj = datetime.strptime(testString, "%Y-%m-%d")
    print(testDateObj)
    # Print current path
    print("Current path is: ", os.getcwd())
    with open(r"api/model_binaries/LSTM_model.pkl", "rb") as file:
        model = pickle.load(file)

    data = await prisma.statevaccination.find_many(
        where={
            "date": {
                "gte": testDateObj
            }
        },
        take=10

    )
    return data[0].model_dump_json()


class StockIn(BaseModel):
    ticker: str


class StockOut(StockIn):
    forecast: dict


@app.post("/api/predict", response_model=StockOut, status_code=200)
def get_prediction(payload: StockIn):
    ticker = payload.ticker

    prediction_list = predict(ticker)

    if not prediction_list:
        raise HTTPException(status_code=400, detail="Model not found.")
    response_object = {"ticker": ticker, "forecast": convert(prediction_list)}
    print(response_object)
    return response_object


@app.get("/api/predict/finance/{ticker}")
async def get_prediction(ticker: str):
    prediction_list = predict(ticker)
    if not prediction_list:
        raise HTTPException(status_code=400, detail="Balls.")
    response_object = {"ticker": ticker, "forecast": convert(prediction_list)}
    print(response_object)
    return response_object


@app.get("/api/predict/lstm_model")
async def predict_lstm_model(
    # End date of the range to forecast
    recorded_before: Optional[datetime] = Query(
        None, alias="recordedBefore", description="End date in ISO format received from the frontend"),
    # Start date of the range to forecast
    recorded_after: Optional[datetime] = Query(
        None, alias="recordedAfter", description="Start date in ISO format received from the frontend")
):
    # # Remove timezone info
    # recorded_before_has_tz = pd.to_datetime(recorded_before) if recorded_before else datetime(
    #     year=2023, month=3, day=10)
    # recorded_after_has_tz = pd.to_datetime(recorded_after) if recorded_after else datetime(
    #     year=2022, month=3, day=9)
    # print(recorded_before_has_tz, recorded_after_has_tz)
    # Load and preprocess the data
    df = pd.read_csv(r"api/dataset/training_dataset.csv")  # Up to 20/4/2021
    df.drop(columns=['Unnamed: 0', 'state', 'cases_new_capita'], inplace=True)
    # sum each date for each column sum all 14 rows
    df = df.groupby('date').sum()
    df.index = pd.to_datetime(df.index)
    df = df.asfreq('d')  # changes the frequency to daily

    # Scale the data
    scaler = MinMaxScaler()
    scaler = scaler.fit(df[['cases_new']])
    df_scaled = scaler.transform(df[['cases_new']])

    # Split the data into training and testing sets
    split_index = int(len(df) * 0.5)  # Trains up to 2022-03-09 for 0.5
    # Get the date cutoff based on the split index
    train_data = df_scaled[:split_index]
    test_data = df_scaled[split_index:]

    testX = []
    past = 14
    future = 1
    print(df.shape[1])
    for i in range(past, len(test_data) - future + 1):
        testX.append(test_data[i-past:i, 0:df.shape[1]])

    testX = np.array(testX)
    recorded_after = pd.to_datetime(recorded_after)
    recorded_before = pd.to_datetime(recorded_before)

    recorded_after = recorded_after.replace(tzinfo=None)
    recorded_before = recorded_before.replace(tzinfo=None)
    # extra_days_count = int((recorded_before - test_data.index[-1]).days)
    # future_dates_count = (recorded_before - test_data.index[-1]).days
    future_dates_count = len(test_data) - 14
    # print(test_data.index[-1])  # the last date in the test data

    forecast_dates = pd.date_range(
        start="2022-03-23",
        periods=future_dates_count,
    )
    forecast = model.predict(testX[-future_dates_count:])
    pred = scaler.inverse_transform(forecast)[:, 0]
    forecast_df = pd.DataFrame(
        {'Date': forecast_dates, 'Forecast': pred})  # plot this one out
    forecast_df.set_index('Date', inplace=True)
    # print(forecast_df.to_dict())
    return {
        "message": forecast_df.to_dict(),
        "comments": f"This data is forecasted from {forecast_dates[0].strftime('%d %B %Y')} to {forecast_dates[-1].strftime('%d %B %Y')}."
    }


@app.get("/api/predict/random_forest")
async def predict_random_forest(
    recorded_before: Optional[datetime] = Query(
        None, alias="recordedBefore", description="End date in ISO format received from the frontend"),
    # Start date of the range to forecast
    recorded_after: Optional[datetime] = Query(
        None, alias="recordedAfter", description="Start date in ISO format received from the frontend")
):
    recorded_after = pd.to_datetime(recorded_after)
    recorded_before = pd.to_datetime(recorded_before)

    recorded_after = recorded_after.replace(tzinfo=None)
    recorded_before = recorded_before.replace(tzinfo=None)

    df = pd.read_csv(r'api/dataset/training_dataset.csv')  # Marcus csv
    df.drop(columns=['Unnamed: 0', "state", "cases_new_capita"], inplace=True)
    df["date"] = pd.to_datetime(df["date"])
    df = df[df["date"] >= "2021-01-01"]
    df = df.groupby('date').sum()

    # df_var = df.copy()

    col_name = df.columns.tolist()  # Combine

    for col in col_name:
        for i in range(1, 3):  # Two lag columns
            df[f"{col}_lag_{i}"] = df[col].shift(i)

    pd.set_option('display.max_columns', None)

    df.dropna(inplace=True)

    df_x = df.drop(columns=col_name)
    df_y = df[col_name]  # Target variable

    # test_data_x = test_data.drop(columns=col_name)
    # test_data_y = test_data[col_name]

    # Prediction process

    recorded_after  # Start Date
    recorded_before  # End Date

    # if recorded_after > "2024-04-20":  # You cant set a start date after the last date in the dataset
    #     return "Invalid date range. Please enter a date range before 2024-04-20."

    data = df.loc[df.index.get_level_values('date') == "2024-04-20"]
    data = data.drop(columns=col_name)

    # Convert recorded before into days
    days = int(
        (recorded_before - datetime.strptime("2024-04-20", "%Y-%m-%d")).days)

    days = 90 if days == 0 else days

    result = []

    next_day = random_forest_model.predict(data)
    result.append(next_day[0])

    for i in range(days):
        count = 0
        for col in col_name:
            data[f"{col}_lag_1"] = data[f"{col}_lag_2"]
            data[f"{col}_lag_2"] = next_day[0][count]
            count = count + 1

        next_day = random_forest_model.predict(data)
        result.append(next_day[0])

    result_df = pd.DataFrame(result, columns=col_name)
    result_df.index = pd.date_range(
        start="2024-04-21", periods=days + 1, freq='D')
    # Get cases_new only
    result_df = result_df["cases_new"]
    # print(result_df.to_dict())
    return {"message": {"Forecast": result_df.to_dict()}, "comments": f"This data is forecasted from {result_df.index[0].strftime('%d %B %Y')} to {result_df.index[-1].strftime('%d %B %Y')}."}


@app.get("/api/predict/arima")
async def predict_arima(
    recorded_before: Optional[datetime] = Query(
        None, alias="recordedBefore", description="End date in ISO format received from the frontend"),
    # Start date of the range to forecast
    recorded_after: Optional[datetime] = Query(
        None, alias="recordedAfter", description="Start date in ISO format received from the frontend")
):
    recorded_after = pd.to_datetime(recorded_after)
    recorded_before = pd.to_datetime(recorded_before)

    recorded_after = recorded_after.replace(tzinfo=None)
    recorded_before = recorded_before.replace(tzinfo=None)

    df = pd.read_csv(r"api/dataset/training_dataset.csv")  # Up to 20/4/2021
    df.drop(columns=['Unnamed: 0', 'state', 'cases_new_capita'], inplace=True)
    # sum each date for each column sum all 14 rows
    df = df.groupby('date').sum()
    df.index = pd.to_datetime(df.index)
    df = df.asfreq('d')  # changes the frequency to daily

    # Split the data into training and testing sets
    split_index = int(len(df) * 0.5)  # Trains up to 2022-03-09 for 0.5
    # Get the date cutoff based on the split index
    test_data = df.iloc[split_index:]

    extra_days_count = int((recorded_before - test_data.index[-1]).days)
    future_dates_count = len(test_data) + extra_days_count

    forecast = arima_model.predict(n_periods=future_dates_count)
    forecast_index = test_data.index
    forecast_dates = pd.date_range(
        start=forecast_index[0],
        periods=future_dates_count,
    )
    arima_forecast = pd.DataFrame(
        {'Date': forecast_dates, 'Forecast': forecast})
    arima_forecast.set_index('Date', inplace=True)

    return {"message": arima_forecast.to_dict(), "comments": f"This data is forecasted from {forecast_dates[0].strftime('%d %B %Y')} to {forecast_dates[-1].strftime('%d %B %Y')}."}
