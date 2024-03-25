from fastapi import FastAPI
from api import shelter

app = FastAPI()
app.include_router(shelter.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}