from fastapi import APIRouter,Depends

from service.shelter import ShelterService
from schema.response import ShelterPathSchema


router=APIRouter(prefix="/shelters",tags=["shelters"])


@router.get("/{shelter_id}",status_code=200)
def get_path_handler(
        shelter_id:str,
        latitude:float,
        longitude:float,
        shelter_service: ShelterService = Depends()
                    )->ShelterPathSchema:
    print({shelter_id})
    print({latitude})
    print({longitude})
    return ShelterPathSchema(path=[[1,2],[3,4]],distance=12)