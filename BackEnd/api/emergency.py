from fastapi import APIRouter
from schema.response import EmergencySchema


router=APIRouter(prefix="/emergency",tags=["emergency"])

@router.post("",status_code=201)
async def get_path_handler(
                    )->EmergencySchema:
    #wrapper 부분
    return EmergencySchema()