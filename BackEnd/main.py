from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.mapdb import mapdb
from database.mongo import mongodb
from schema.response import PingPongSchema
from api import shelter
from resource.logo import the_end_logo
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse


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

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": "fail",
            "data": {
                "msg": exc.detail,
                "status_code": exc.status_code
            }
        }
    )