from pydantic import BaseModel


class FoVRequestModel(BaseModel):
    """
    Image of a fruit or vegetable.
    """


class FoVResponseModel(BaseModel):
    classificationId: str    # classificationId
    apple: int
    banana: int
    beetroot: int
    bell_pepper: int
    cabbage: int
    capsicum: int
    carrot: int
    cauliflower: int
    chilli_pepper: int
    corn: int
    cucumber: int
    eggplant: int
    garlic: int
    ginger: int
    grapes: int
    jalepeno: int
    kiwi: int
    lemon: int
    lettuce: int
    mango: int
    onion: int
    orange: int
    paprika: int
    pear: int
    peas: int
    pineapple: int
    pomegranate: int
    potato: int
    raddish: int
    soy_beans: int
    spinach: int
    sweetcorn: int
    sweetpotato: int
    tomato: int
    turnip: int
    watermelon: int
