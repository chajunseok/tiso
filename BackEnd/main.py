from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.mapdb import mapdb
from database.mongo import mongodb
from schema.response import PingPongSchema
from api import shelter,path
from resource.logo import the_end_logo


@asynccontextmanager
async def lifespan(app: FastAPI):
    mapdb.load()
    mongodb.connect()
    yield
    mapdb.close()
    mongodb.close()
    print(the_end_logo)
    
app = FastAPI(lifespan=lifespan)

app.include_router(shelter.router)
app.include_router(path.router)

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}