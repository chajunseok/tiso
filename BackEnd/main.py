from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.mapdb import mapdb
from database.mongo import mongodb
from schema.response import PingPongSchema
from api import shelter
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    mapdb.load()
    mongodb.connect()
    yield
    mapdb.close()
    mongodb.close()
    
app = FastAPI(lifespan=lifespan)
app.include_router(shelter.router)

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}