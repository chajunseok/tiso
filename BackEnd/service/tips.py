from fastapi import Depends
from repository.tips import TipsRepository
from schema.response import TipsInfoSchema
from typing import List

class TipsService :
    def __init__(self,tip_repository:TipsRepository = Depends()):
        self.tip_repository=tip_repository
        print("TipService init")
        
    def get_tips(self, code: str) -> List[TipsInfoSchema]:
        data = self.tip_repository.get_tips(code)
        
        result = [TipsInfoSchema(
            code=tip['code'],
            title=tip['title'],
            contents=tip['contents']
        ) for tip in data]
        
        return(result)
        