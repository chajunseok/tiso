from fastapi import APIRouter, Depends
from database.emergencydb import EmergencyDB, get_emergencydb
from repository.odm import PathDocument
from service.emergency import EmergencyService
from schema.request import EmergencyUpdate
from schema.response import EmergencyPathRespSchema, EmergencySchema, PathRespSchema, ShelterPathSchema


router=APIRouter(prefix="/emergency",tags=["emergency"])

@router.post("",status_code=201)
async def get_path_handler(
    emergency_update_data:EmergencyUpdate,
    emergency_service:EmergencyService=Depends()
                            )->EmergencySchema:
    emergency_service.update_emergency_data(emergency_update_data.dangerArea)

    return EmergencySchema()

@router.get("/path",status_code=200)
async def get_emergency_path_handler(
                                    latitude:float,
                                    longitude:float,
                                    emergency_service:EmergencyService=Depends(),
                                    emergencydb:EmergencyDB=Depends(get_emergencydb)
                                )->EmergencyPathRespSchema:
    print(latitude)
    print(longitude)
    shelter_path_info: PathDocument=emergency_service.get_path_from_gps_to_nearest_shelter(
                        latitude=latitude,longitude=longitude
                        )
    return EmergencyPathRespSchema(data={
            "pathInfo":ShelterPathSchema.from_odm_to_schema(shelter_path_info),
            "dangerAreaInfo" : {
                "gps":emergencydb.danger_area,
                "radius" : emergencydb.radius
            }
        })