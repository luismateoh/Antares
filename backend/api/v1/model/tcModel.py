from pydantic import BaseModel, Field


class ToxicCommentRequestModel(BaseModel):
    """
    Toxic Comments
    """
    comment: str = Field(
        example="This is a comment", description="Comment"
    )


class ToxicCommentResponseModel(BaseModel):
    classificationId: str
    toxic: int
    severe_toxic: int
    obscene: int
    threat: int
    insult: int
    identity_hate: int
