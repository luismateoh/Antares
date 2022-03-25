import uuid
import pickle
import numpy as np
from pathlib import Path
from loguru import logger
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences


def tc_load():
    model_path = Path("./modelFiles/toxic_comment_model.h5")
    if model_path.is_file():
        logger.info("Load completed")
        return load_model(model_path)
    else:
        logger.exception("Model file not found")


def tc_predict(model, body):
    maxlength = 100  # max number of words in a comment to use
    request = body.dict()
    payload = [x for x in request.values()]

    with open('modelFiles/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    list_tokenized_test = tokenizer.texts_to_sequences(payload)
    x_te = pad_sequences(list_tokenized_test, maxlen=maxlength)

    prediction = model.predict(x_te)
    prediction = list(map(lambda x: int(np.round(x, 2) * 100), prediction[0]))
    return {
        "classificationId": str(uuid.uuid1()),
        "toxic": prediction[0],
        "severe_toxic": prediction[1],
        "obscene": prediction[2],
        "threat": prediction[3],
        "insult": prediction[4],
        "identity_hate": prediction[5]}
