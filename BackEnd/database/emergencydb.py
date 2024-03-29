import gc
from typing import Optional
from datetime import datetime


#fastapi를 single process로 할경우만 적용가능,해당 전역변수는 현재의 app에서만 통용되기에 multiprocess일경우 redis등의 db를 활용해야한다.
class EmergencyDB:
    def __init__(self):
        self.is_emergency : Optional[bool] = None
        self.danger_area : Optional[dict] = None
        self.occur_time : Optional[datetime] = None

    def load(self):
        print("==========================EmergencyDB=========================")
        self.is_emergency=False
        self.danger_area={}
        print("비상상황 전역변수가 초기화되었습니다.")
        print("==========================EmergencyDB=========================")

    def close(self):
        print("==========================EmergencyDB=========================")
        del self.is_emergency
        del self.danger_area
        del self.occur_time
        gc.collect()
        print("==========================EmergencyDB=========================")

emergencydb=EmergencyDB()

def get_emergencydb():
    return emergencydb
    
