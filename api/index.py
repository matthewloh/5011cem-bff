import os
import pickle
from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from api.model import convert, predict
from api.src.prisma import prisma
from prisma.types import StateEpidemicWhereInput
from datetime import datetime
app = FastAPI()


@app.on_event("startup")
async def startup():
    await prisma.connect()


@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()


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


@app.get("/api/predict/{ticker}")
async def get_prediction(ticker: str):
    prediction_list = predict(ticker)
    if not prediction_list:
        raise HTTPException(status_code=400, detail="Model not found.")
    response_object = {"ticker": ticker, "forecast": convert(prediction_list)}
    print(response_object)
    return response_object


@app.get("/api/train/lstm_model")
async def train_lstm_model(
    # Parameter 1: Start date of training data
    recordedAfter: datetime = datetime(year=2020, month=1, day=1),
    # Parameter 2: End date of training data
    recordedBefore: datetime = datetime(year=2021, month=1, day=10)
):
    print(recordedBefore, recordedAfter)
    recordedAtQuery = StateEpidemicWhereInput(
        date={"gte": recordedAfter, "lte": recordedBefore}
    )
    recordedAtQuery["date"]["gte"] = recordedAfter if recordedAfter else datetime(
        year=2020, month=1, day=1)
    recordedAtQuery["date"]["lte"] = recordedBefore if recordedBefore else TODAY
    data = await prisma.stateepidemic.find_many(
        take=7,
        where={
            'AND': [
                {
                    'date': {
                        'gte': datetime(year=2020, month=1, day=25)
                    },
                },
                {
                    'date': {
                        'lte': datetime(year=2022, month=1, day=10)
                    },
                },
            ],
        },
        order={
            "date": "asc"
        }
    )
    return {"message": f"""
{data}
"""
    }


class LSTMResponseIn(BaseModel):
    date: datetime
    state: str
    total_vaccinations: int
    total_distributed: int
    daily_vaccinations: int
    daily_distributed: int


class LSTMResponseOut(BaseModel):
    date: datetime
    state: str
    total_vaccinations: int
    total_distributed: int
    daily_vaccinations: int
    daily_distributed: int
    prediction: int


@app.post("/api/predict/lstm_model")
def predict_lstm_model(payload: LSTMResponseIn):
    date = payload.date
    return {"message": "Predicting LSTM Model"}


@app.get("/api/predict/lstm_model")
async def predict_lstm_model():
    with open(r"api/model_binaries/LSTM_model.pkl", "rb") as file:
        model = pickle.load(file)
    pass
