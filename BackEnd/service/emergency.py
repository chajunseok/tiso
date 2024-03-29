from fastapi import Depends
from repository.path import PathRepository
from repository.shelter import ShelterRepository
from database.emergencydb import EmergencyDB, get_emergencydb 
from datetime import datetime

class EmergencyService:
    def __init__(self,emergencydb:EmergencyDB=Depends(get_emergencydb),path_repository:PathRepository = Depends(),shelter_repository:ShelterRepository = Depends()):
        self.emergency_db=emergencydb
        print("EmergencyService init")
    
    def update_emergency_data(self,danger_area:dict[str,float])->None:
        self.emergency_db.is_emergency=True
        self.emergency_db.occur_time=datetime.now()

        # 위험지역이 있다면 업데이트
        if len(danger_area)!=0:
            self.emergency_db.danger_area.update({
                "latitude":danger_area["latitude"],
                "longitude":danger_area["longitude"]
            })
        
        return 