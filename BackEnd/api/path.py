from fastapi import APIRouter,Depends

from service.path import PathService
from schema.response import PathRespSchema, ShelterPathSchema


router=APIRouter(prefix="/paths",tags=["paths"])

@router.get("",status_code=200)
async def get_path_handler(
        shelter_id:str,
        latitude:float,
        longitude:float,
        path_service: PathService = Depends()
                    )->PathRespSchema:
    print({shelter_id})
    print({latitude})
    print({longitude})
    shelter_path_info=path_service.get_path_from_gps_to_shelter(latitude,longitude,shelter_id)
    #wrapper 부분
    return PathRespSchema(data=ShelterPathSchema.from_orm_to_schema(shelter_path_info))

