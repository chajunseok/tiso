from typing import List,Optional

class Document:
    def __new__(cls,*args ,**kwargs):
        obj = super().__new__(cls)
        document=kwargs["data"]
        class_varible_list=[i for i in dir(cls) if not callable(i) if not i.startswith("__") ]
        for class_varible in class_varible_list: 
            setattr(obj,class_varible,document[class_varible]) 
        return obj
    
class PathDocument(Document):
    id : Optional[str] = "powqjdpqwd213"
    path : Optional[list] = [[127.123,37.123123],[128.1651364312,38.121509135],[129.165136,135.214]]
    distance : Optional[float] = "18.981347"