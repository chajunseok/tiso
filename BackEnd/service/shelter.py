from fastapi import Depends
from repository.shelter import ShelterRepository

class ShelterService:
    def __init__(self,shelter_repository:ShelterRepository = Depends()):
        self.shelter_repository=shelter_repository
        print("ShelterService init")