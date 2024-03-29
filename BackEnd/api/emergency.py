from fastapi import APIRouter, Depends
from service.emergency import EmergencyService
from schema.request import EmergencyUpdate
from schema.response import EmergencySchema


router=APIRouter(prefix="/emergency",tags=["emergency"])

@router.post("",status_code=201)
async def get_path_handler(
    emergency_update_data:EmergencyUpdate,
    emergency_service:EmergencyService=Depends()
                    )->EmergencySchema:
    emergency_service.update_emergency_data(emergency_update_data.dangerArea)

    return EmergencySchema()