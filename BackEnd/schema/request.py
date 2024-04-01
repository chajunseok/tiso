from pydantic import BaseModel


class EmergencyUpdate(BaseModel):
    dangerArea: dict[str,float] = {
                                    "latitude":37.08448,
		                            "longitude":127.92740927
                                }
    
    
class UrlPattern(BaseModel):
    url: str
