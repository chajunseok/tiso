from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import time
import gpt_location
import naver_geocoding
import fcm_push

# WebDriver 설정
driver = webdriver.Chrome()  # ChromeDriver 경로 지정 필요

# 가장 최근에 확인한 메시지 번호 저장
last_checked_message_number = None

def crawl_and_save():
    global last_checked_message_number  # 전역 변수 사용 선언
    
    # 페이지 접속
    driver.get('https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/sfc/dis/disasterMsgList.jsp?menuSeq=679')

    # 대전광역시 선택
    dropdown = driver.find_element(By.ID, "sbLawArea1")
    select = Select(dropdown)
    select.select_by_value("1100000000")

    # 검색 버튼 클릭
    driver.find_element(By.CLASS_NAME, 'search_btn').click()

    # 잠시 대기
    time.sleep(1)

    # 메시지 목록 가져오기
    message_list = driver.find_element(By.XPATH, '//*[@id="disasterSms_tr"]')

    if(message_list.size == 0): 
        return

    # 각 메시지 클릭 후 내용 가져오기
    # for i in range(1, len_messages + 1):
    
    # 맨 위 메세지만 가져오기
    for i in range(1, 2):
        # 재난 문자 번호
        number = message_list.find_element(By.XPATH, './tr[{}]/td[1]/span'.format(i)).text
        
        # 동일한 메시지를 다시 확인하지 않도록 검사
        if number == last_checked_message_number:
            print("이미 확인한 메시지입니다.")
            return
        else:
            last_checked_message_number = number  # 새로운 메시지 번호를 저장
        
        # 재난문자 클릭
        message_list.find_element(By.XPATH, './tr[{}]/td[4]'.format(i)).click()
        time.sleep(1)
        
        # 메시지 내용 가져오기
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        msg_cn = soup.find('div', {'id': 'msg_cn'}).text
        
        ###### 메세지 테스트 ########
        # msg_cn = "[긴급] 금일 06:40경 장안면 독정리 677 공장에서 화재발생, 연기가 다량 발생하는 중이니 안전에 주의하여 주시기 바랍니다. [화성시]"
        
        # '위급' 또는 '긴급' 단어가 포함되어 있는지 확인
        if '[위급]' in msg_cn or '[긴급]' in msg_cn:
            
            # 푸시알람 전송 
            print(fcm_push.message)
            
            # gpt로 지명분석
            gpt_answer = gpt_location.analyze_text(msg_cn)
            location_list = gpt_answer.split(", ")

            # 결과 출력
            print(number, gpt_answer, location_list)
            # 해당 위치 위도,경도로 변환
            for location in location_list:
                latitude, longitude = naver_geocoding.get_lat_lon(location)
                print(f"Latitude: {latitude}, Longitude: {longitude}")

        # 뒤로 가기
        driver.back()
        time.sleep(1)

# 주기적 실행을 위한 루프
try:
    while True:
        crawl_and_save()
        time.sleep(10)  # 10초 대기
except KeyboardInterrupt:
    print("스크립트 종료")  

# WebDriver 종료
driver.quit()