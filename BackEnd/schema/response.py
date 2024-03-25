from pydantic import BaseModel

class PingPongSchema(BaseModel):
    message : str ="Hello World"

class ShelterPathSchema(BaseModel):
    path: list[tuple[float,float]] = [(37.123,127.233),(37.55,127.6466)]
    distance: float = 1001.53125