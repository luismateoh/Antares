import uuid
import numpy as np
import tensorflow as tf
from os import remove, getcwd
from pathlib import Path
from loguru import logger
from tensorflow import keras


def img_load():
    model_path = Path("./modelFiles/eyes_model.h5")
    if model_path.is_file():
        logger.info("Load completed")
        return keras.models.load_model(model_path)
    else:
        logger.exception("Model file not found")


def img_predict(model, file_name, image_path):
    img = keras.preprocessing.image.load_img(image_path, target_size=(128, 128))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis

    predictions = model.predict(img_array)
    male_score = int(np.round(predictions[0], 2) * 100)
    female_score = abs(100-male_score)
    try:
        remove(getcwd() + "/" + file_name)
        logger.info("File " + file_name + " removed")
    except FileNotFoundError:
        logger.info("File not found")

    return {
        "classificationId": str(uuid.uuid1()),
        "male_eye": male_score,
        "female_eye": female_score,
    }
