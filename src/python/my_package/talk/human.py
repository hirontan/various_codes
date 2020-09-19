from my_package.tools import utils
# from ..my_package.tools import utils # オススメしない書き方


def sing():
    return 'sing'


def cry():
    return utils.say_twice('cry')
