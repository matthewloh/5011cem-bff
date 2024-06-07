from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/python/{name}")
async def hello_name(name: str):
    return {"message": f"Hello {name}"}
