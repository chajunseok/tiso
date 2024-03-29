from fastapi import APIRouter,Depends
from service.tips import TipsService
from schema.response import TipsRespSchema, TipsInfoSchema
from typing import List

router=APIRouter(prefix="/tips",tags=["tips"])

@router.get("/{code}", status_code=200)
def get_shelter(code: str, tip_service: TipsService = Depends()) -> TipsRespSchema:
        print(code)
        tips : List[TipsInfoSchema] = tip_service.get_tips(code)
        return TipsRespSchema(status=200, data= { "tips" : tips})