from loguru import logger
from fastapi.routing import APIRouter
from api.v1.model.tcModel import ToxicCommentRequestModel, ToxicCommentResponseModel
from api.v1.service.tcService import tc_load, tc_predict

router = APIRouter(prefix="/toxic-comment")
logger.info("Toxic comment classification model")
model = tc_load()


@router.post(
    "/classify", tags=["PNL"], response_model=ToxicCommentResponseModel
)
async def toxic_comment_prediction(body: ToxicCommentRequestModel):
    return tc_predict(model, body)
