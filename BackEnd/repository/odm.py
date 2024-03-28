from typing import List,Optional

class Document:
    def __new__(cls,*args ,**kwargs):
        obj = super().__new__(cls)
        document=kwargs["data"]
        class_varible_list=[i for i in dir(cls)]
        for insert_key in document:
            if insert_key not in class_varible_list:
                raise Exception(f"{insert_key}는 스키마에 없는 필드입니다.")
        for attr in dir(cls): 
            if attr in document:
                setattr(obj,attr,document[attr]) 
        if document != None and len(document) != 0:
            setattr(obj,"inserted",True) 
        else:
            setattr(obj,"inserted",False) 
        return obj

    def isEmpty(self):
        return self.inserted
    
class PathDocument(Document):
    id : Optional[str] = "powqjdpqwd213"
    path : Optional[list] = [[127.123,37.123123],[128.1651364312,38.121509135],[129.165136,135.214]]
    distance : Optional[float] = "18.981347"

class ShelterInfoDocument(Document):
    _id : Optional[str] = "65fd1f64a1c2102da599cf79"
    name : Optional[str] = "구암역 대전1호선 지하역사(지하1층)"
    address : Optional[str] = "대전광역시 유성구 유성대로 703 (구암동)"
    capacity : Optional[int] = 1989
    coordinates : Optional[list[float,float]] = [36.35652933,127.3310839]
    type : Optional[str] = "S2"
    code : Optional[str] = "point"