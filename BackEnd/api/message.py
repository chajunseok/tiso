from fastapi import APIRouter, Depends, Form
from fastapi.responses import HTMLResponse
import sys
from service.emergency import EmergencyService
from util import fcm_push, gpt_location, naver_geocoding
from api import emergency


router=APIRouter(prefix="",tags=["messages"])

@router.get("/",status_code=200, response_class=HTMLResponse)
async def send_message():
    return """
    <html>
        <head>
            <style>
                input[type="text"] {
                    height: 300px; /* 입력 박스의 높이를 40픽셀로 설정 */
                    font-size: 20px; /* 텍스트 크기도 조금 더 크게 설정 */
                }
                button {
                    height: 30px; /* 버튼의 높이를 입력 박스보다 약간 더 크게 설정 */
                    font-size: 15px; /* 버튼의 텍스트 크기도 조정 */
                }
            </style>
        </head>
        <body>
            <form action="/submit" method="post">
                <textarea type="text" name="test_title" placeholder="문자 제목 입력"></textarea>
                 <textarea type="text" name="test_body" placeholder="문자 내용 입력"></textarea>
                <button type="submit">메세지 전송</button>
            </form>
        </body>
    </html>
    """

@router.post("/submit")
async def handle_form(test_title: str = Form(...), test_body: str = Form(...), emergency_service:EmergencyService=Depends()):
    # 입력된 두 값을 반환합니다.
    fcm_push.alarm(test_title,test_body)
    message = gpt_location.analyze_text(test_body)
    lat,lon = naver_geocoding.get_lat_lon(message)
    print("==================== api단 출력 =============================")
    print("지역 분석: " , message)
    print("위도 경도: " , lat, lon)
    emergency_service.update_emergency_data({"latitude" : lat, "longitude" : lon})
    return {"test_title ": test_title, "test_body": test_body, "latitude": lat , "longitude": lon}