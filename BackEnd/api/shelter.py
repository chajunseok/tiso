from fastapi import APIRouter,Depends
from typing import List
from service.shelter import ShelterService
from schema.response import ShelterPathSchema, ShelterInfoSchema, ShelterRespSchema


router=APIRouter(prefix="/shelters",tags=["shelters"])


@router.get("/find/{shelter_id}",status_code=200)
async def get_path_handler(
        shelter_id:str,
        latitude:float,
        longitude:float,
        shelter_service: ShelterService = Depends()
                    )->ShelterPathSchema:
    print({shelter_id})
    print({latitude})
    print({longitude})
    return ShelterPathSchema(path=[[1,2],[3,4]],distance=12)

@router.get("/now", status_code=200)
def get_near_shelter(lat: float, lng: float, shelter_service: ShelterService = Depends()) -> ShelterRespSchema:
        print({lat})
        print({lng})
        user_location = [lng, lat]  # MongoDB는 [경도, 위도] 순서를 사용
        
        shelters = shelter_service.get_near_service(user_location)
        return ShelterRespSchema(status="success", shelterList=shelters)