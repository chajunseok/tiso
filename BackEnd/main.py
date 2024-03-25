from fastapi import FastAPI
from schema.response import PingPongSchema
from api import shelter

app = FastAPI()
app.include_router(shelter.router)

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}