from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.mongo import mongodb
from schema.response import PingPongSchema
from api import shelter

@asynccontextmanager
async def lifespan(app: FastAPI):
    mongodb.connect()
    yield
    mongodb.close()
    
app = FastAPI(lifespan=lifespan)
app.include_router(shelter.router)

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}