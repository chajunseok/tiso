from fastapi import APIRouter,Depends
from typing import List
from service.shelter import ShelterService
from schema.response import ShelterPathSchema, ShelterInfoSchema, ShelterRespSchema


router=APIRouter(prefix="/shelters",tags=["shelters"])

@router.get("/now", status_code=200)
def get_near_shelter(lat: float, lng: float, shelter_service: ShelterService = Depends()) -> ShelterRespSchema:
        print({lat})
        print({lng})
        user_location = [lng, lat]  # MongoDB는 [경도, 위도] 순서를 사용
        
        shelters = shelter_service.get_near_service(user_location)
        return ShelterRespSchema(status=200, data= { "shelterList" : shelters} )