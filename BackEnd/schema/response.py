from pydantic import BaseModel
from typing import List

class PingPongSchema(BaseModel):
    message : str ="Hello World"

class ShelterPathSchema(BaseModel):
    path: list[tuple[float,float]] = [(37.123,127.233),(37.55,127.6466)]
    distance: float = 1001.53125
    
class ShelterInfoSchema(BaseModel):
    shelterId: str = "65fd1f64a1c2102da599cf79"
    name: str = "구암역 대전1호선 지하역사(지하1층)"
    address: str = "대전광역시 유성구 유성대로 703 (구암동)"
    capacity: int = 1989
    latitude: float = 36.35652933
    longitude: float = 127.3310839
    type: str = "S2"


class ShelterRespSchema(BaseModel):
    #status 는 내부 코드입니다.
    status: int = 2000
    data : dict[str,list[ShelterInfoSchema]] = {
        "shelterList":[ShelterInfoSchema(),ShelterInfoSchema(),ShelterInfoSchema()]
    }

class PathRespSchema(BaseModel):
    status: int = 2000
    data : ShelterPathSchema = ShelterPathSchema()