from loguru import logger
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from api.v1.controller.tcController import router as toxic_comment_ns
from api.v1.controller.eyesController import router as eyes_ns
from api.v1.controller.fovController import router as fov_ns

# Initialize logging
logger.add("./logs/Antares.log", rotation="250 MB")
logger.info("Initializing application : Antares")

app = FastAPI(
    title="Antares API",
    version="1.0",
    description="Machine learning application",
)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


logger.info("Adding Toxic Comment namespace route")
app.include_router(toxic_comment_ns)
logger.info("Adding eyes namespace route")
app.include_router(eyes_ns)
logger.info("Adding fov namespace route")
app.include_router(fov_ns)


@app.get("/", include_in_schema=False)
async def redirect():
    return RedirectResponse("/docs")
