from contextlib import asynccontextmanager
from fastapi import FastAPI
from database.pathdb import pathdb
from database.mapdb import mapdb
from database.mongo import mongodb
from schema.response import PingPongSchema
from api import shelter,path, tips
from resource.logo import the_end_logo
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    mapdb.load()
    mongodb.connect()
    pathdb.connect()
    yield
    mapdb.close()
    mongodb.close()
    pathdb.close()
    print(the_end_logo)
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] ,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shelter.router)
app.include_router(path.router)
app.include_router(tips.router)

@app.get("/",status_code=200)
async def root() -> PingPongSchema:
    return {"message": "Hello World"}

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": 4000,
            "data": {
                "msg": exc.detail,
                "status_code": exc.status_code
            }
        }
    )