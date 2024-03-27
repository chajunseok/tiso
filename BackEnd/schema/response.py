from pydantic import BaseModel
from typing import List

class PingPongSchema(BaseModel):
    message : str ="Hello World"

class ShelterPathSchema(BaseModel):
    path: list[tuple[float,float]] = [(37.123,127.233),(37.55,127.6466)]
    distance: float = 1001.53125
    
class ShelterInfoSchema(BaseModel):
    shelterId: str
    name: str
    address: str
    capacity: int
    latitude: float
    longitude: float
    type: str
    
class ShelterRespSchema(BaseModel):
    status: str
    shelterList: List[ShelterInfoSchema]