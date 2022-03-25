from os import getcwd

from fastapi import UploadFile, File
from loguru import logger
from fastapi.routing import APIRouter
from api.v1.service.fovService import img_load, img_predict
from api.v1.model.fovModel import FoVResponseModel

router = APIRouter(prefix="/fruit-or-vegetable")
logger.info("fov classification model")
model = img_load()


@router.post("/classify", tags=["CNN"], response_model=FoVResponseModel)
async def create_upload_file(file: UploadFile = File(...)):
    with open(file.filename, 'wb') as image:
        content = await file.read()
        image.write(content)
        image.close()
    logger.info("File " + file.filename + " saved")
    file_path = getcwd() + "/" + file.filename
    return img_predict(model, file.filename, file_path)
