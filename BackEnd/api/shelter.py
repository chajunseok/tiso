from fastapi import APIRouter,Depends
from typing import List
from service.shelter import ShelterService
from schema.response import ShelterPathSchema, ShelterInfoSchema


router=APIRouter(prefix="/shelters",tags=["shelters"])


@router.get("/{shelter_id}",status_code=200)
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

@router.get("/now", status_code=200, response_model=List[ShelterInfoSchema])
async def get_near_shelter(latitude:float, longitude:float, shelter_service: ShelterService = Depends()
                    )->ShelterPathSchema:

