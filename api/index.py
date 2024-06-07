from fastapi import FastAPI
from api.src.prisma import prisma
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
    mvac = await prisma.malaysiavaccination.find_first(
        where={
            "state": name
        }
    )
    print(mvac.model_dump())
    return {"message": f"{mvac.model_dump()}"}
