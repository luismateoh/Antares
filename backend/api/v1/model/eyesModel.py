from pydantic import BaseModel


class EyesRequestModel(BaseModel):
    """
    Image of a fruit or vegetable
    """


class EyesResponseModel(BaseModel):
    classificationId: str
    male_eye: int
    female_eye: int
