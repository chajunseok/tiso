from fastapi import APIRouter, HTTPException, Depends
from repository.odm import PathDocument
from service.path import PathService
from schema.response import PathRespSchema, ShelterPathSchema, NaverPathResp, OnlyPathSchema
from schema.request import UrlPattern
import httpx
import os
from dotenv import load_dotenv

load_dotenv('../.env')

CLIENT_KEY = os.getenv('NAVER_CLIENT_KEY')
SECRET_KEY = os.getenv('NAVER_SECRET_KEY')

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
    shelter_path_info: PathDocument=path_service.get_path_from_gps_to_shelter(latitude,longitude,shelter_id)
    #wrapper 부분
    return PathRespSchema(data=ShelterPathSchema.from_odm_to_schema(shelter_path_info))


@router.post("/find", status_code=200)
async def get_naver_path(url_req: UrlPattern) -> NaverPathResp:
        url_path = url_req.url.replace(",", "%2C").replace("|", "%7C")
        
        async with httpx.AsyncClient() as client:
                headers = {
                "X-NCP-APIGW-API-KEY-ID": CLIENT_KEY,
                "X-NCP-APIGW-API-KEY": SECRET_KEY
                }
                try:
                        response = await client.get(url_path, headers=headers)
                        response.raise_for_status()
                        resp_data = response.json()
                        result = resp_data['route']['traoptimal'][0]['path']
                        return NaverPathResp(data=OnlyPathSchema.from_odm_to_schema(result))
                
                except httpx.HTTPStatusError as exc:
                # 서버에서 4XX나 5XX 응답을 반환했을 때 예외 처리
                        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
        

