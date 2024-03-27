from fastapi import APIRouter,Depends

from service.shelter import ShelterService
from schema.response import ShelterPathSchema


router=APIRouter(prefix="/paths",tags=["paths"])


@router.get("",status_code=200)
async def get_path_handler(
        shelter_id:str,
        latitude:float,
        longitude:float,
        shelter_service: ShelterService = Depends()
                    )->ShelterPathSchema:
    print({shelter_id})
    print({latitude})
    print({longitude})
    response_data=shelter_service.get_path_from_gps_to_shelter(latitude,longitude,shelter_id)
    #wrapper 부분
    return response_data

