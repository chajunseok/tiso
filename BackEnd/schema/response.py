from pydantic import BaseModel
from typing import List

class ShelterPathSchema(BaseModel):
    """
        path:[(38.555,127,33),(38.678,127.36)]
        distance:35902.249
    """
    path: list[tuple[float,...]] 
    distance: float