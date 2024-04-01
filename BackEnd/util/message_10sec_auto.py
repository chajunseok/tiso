from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException

from bs4 import BeautifulSoup
import time
import gpt_location
import naver_geocoding
import fcm_push
import json
import requests

# WebDriver 설정
chrome_options = Options()
chrome_options.add_argument("--headless")  # headless 모드 활성화
chrome_options.add_argument("--no-sandbox")  # 샌드박스 비활성화
chrome_options.add_argument("--disable-dev-shm-usage")  # /dev/shm 사용 비활성화
chrome_options.add_argument("--disable-gpu")  # GPU 가속 비활성화, headless 모드에서 권장됩니다.

# Service 객체 생성 및 ChromeDriver의 경로 지정
service = Service(executable_path='/usr/local/bin/chromedriver-linux64/chromedriver')

# WebDriver 객체 생성
driver = webdriver.Chrome(service=service, options=chrome_options)

# 가장 최근에 확인한 메시지 번호 저장
last_checked_message_number = None

# API 엔드포인트 URL
url = "http://tiso.run:8000/emergency"

def crawl_and_save():
    
    print("크롤링 시작")
    
    global last_checked_message_number  # 전역 변수 사용 선언
    
    # 페이지 접속
    driver.get('https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterMsgList.jsp?menuSeq=679')

    # 대전광역시 선택
    dropdown = driver.find_element(By.ID, "sbLawArea1")
    select = Select(dropdown)
    select.select_by_value("3000000000")

    # 검색 버튼 클릭
    driver.find_element(By.CLASS_NAME, 'search_btn').click()

    # 잠시 대기
    time.sleep(1)
    
    # 메시지 목록 가져오기
    message_list = driver.find_element(By.XPATH, '//*[@id="disasterSms_tr"]')
    
    # 재난 문자 번호
    number = message_list.find_element(By.XPATH, './tr[{}]/td[1]/span'.format(1)).text
    
    # 동일한 메시지를 다시 확인하지 않도록 검사
    if number == last_checked_message_number:
        print("이미 확인한 메시지입니다.")
        time.sleep(10)  # 10초 대기
        return
    else:
        last_checked_message_number = number  # 새로운 메시지 번호를 저장
        print("새로운 메세지입니다")
    
    # 재난문자 클릭
    message_list.find_element(By.XPATH, './tr[{}]/td[4]'.format(1)).click()
    time.sleep(1)
    
    # 메시지 내용 가져오기
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    msg_cn_div = soup.find('div', {'id': 'msg_cn'})
    if msg_cn_div is not None:
        msg_cn = msg_cn_div.text
    else:
        print("찾는 요소 없음")
        time.sleep(10)
        return

    ###### 메세지 테스트 ########
    # msg_cn = "[긴급] 금일 06:40경 장안면 독정리 677 공장에서 화재발생, 연기가 다량 발생하는 중이니 안전에 주의하여 주시기 바랍니다. [화성시]"
    
    # '위급' 또는 '긴급' 단어가 포함되어 있는지 확인
    if '[위급]' in msg_cn or '[긴급]' in msg_cn:
        
        # 크롤링한 메세지 출력
        print("위급 or 긴급 메세지 있음")
        print(msg_cn)
        
        # 푸시알람 전송 
        fcm_push.alarm()
        
        # gpt로 지명분석
        gpt_answer = gpt_location.analyze_text(msg_cn)

        # 결과 출력
        print(number, gpt_answer)
        # 해당 위치 위도,경도로 변환
        latitude, longitude = naver_geocoding.get_lat_lon(gpt_answer)
        result = {
            "dangerArea": {
                "latitude": latitude,
                "longitude": longitude
            }
        }
            
    else:
        
        print("크롤링 한 내용이 없습니다.")
        result = {}
    
    # HTTP POST 요청 보내기
    response = requests.post(url, json=json.dumps(result))

    # 응답 확인
    print("====================== response =========================")
    print(response.text)
    
    # 뒤로 가기
    driver.back()
    time.sleep(1)

# 주기적 실행을 위한 루프
while True:
    try:
        crawl_and_save()
    except NoSuchElementException:
        print("찾는 요소가 없음")
        try:
            time.sleep(10)  # 10초 대기
        except TimeoutException:
            # 지정된 시간 내에 요소를 찾지 못한 경우, 페이지를 새로고침하고 다시 시도합니다.
            print("요소를 찾지 못함. 페이지를 새로고침하고 재시도합니다.")
    except KeyboardInterrupt:
        print("스크립트 종료")
        break 
    
# WebDriver 종료
driver.quit()