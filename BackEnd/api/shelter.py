from fastapi import APIRouter,Depends

from service.shelter import ShelterService
from schema.response import ShelterPathSchema


router=APIRouter(prefix="/shelters",tags=["shelters"])



