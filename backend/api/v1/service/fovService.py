import uuid
import numpy as np
import tensorflow as tf
from os import remove, getcwd
from pathlib import Path
from loguru import logger
from tensorflow import keras


def img_load():
    model_path = Path("./modelFiles/fov_model.h5")
    if model_path.is_file():
        logger.info("Load completed")
        return keras.models.load_model(model_path)
    else:
        logger.exception("Model file not found")


def img_predict(model, file_name, image_path):
    img = keras.preprocessing.image.load_img(image_path, target_size=(180, 180))
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis

    prediction = model.predict(img_array)
    prediction = list(map(lambda x: int(np.round(x, 2) * 100), prediction[0]))
    try:
        remove(getcwd() + "/" + file_name)
        logger.info("File " + file_name + " removed")
    except FileNotFoundError:
        logger.info("File not found")
    return {
        "classificationId": str(uuid.uuid1()),
        "apple": prediction[0],
        "banana": prediction[1],
        "beetroot": prediction[2],
        "bell_pepper": prediction[3],
        "cabbage": prediction[4],
        "capsicum": prediction[5],
        "carrot": prediction[6],
        "cauliflower": prediction[7],
        "chilli_pepper": prediction[8],
        "corn": prediction[9],
        "cucumber": prediction[10],
        "eggplant": prediction[11],
        "garlic": prediction[12],
        "ginger": prediction[13],
        "grapes": prediction[14],
        "jalepeno": prediction[15],
        "kiwi": prediction[16],
        "lemon": prediction[17],
        "lettuce": prediction[18],
        "mango": prediction[19],
        "onion": prediction[20],
        "orange": prediction[21],
        "paprika": prediction[22],
        "pear": prediction[23],
        "peas": prediction[24],
        "pineapple": prediction[25],
        "pomegranate": prediction[26],
        "potato": prediction[27],
        "raddish": prediction[28],
        "soy_beans": prediction[29],
        "spinach": prediction[30],
        "sweetcorn": prediction[31],
        "sweetpotato": prediction[32],
        "tomato": prediction[33],
        "turnip": prediction[34],
        "watermelon": prediction[35]
    }
