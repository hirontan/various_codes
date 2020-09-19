# import my_package.utils
# from my_package.tools import utils
# from my_package.utils import say_twice # こっちはあまり好まれていない

# from my_package.talk import human
# from my_package.talk import animal
# from my_package.talk import *   # 何を使っているかわからないので、できるだけ避ける

# r = utils.say_twice('hello')
# print(r)

# print(human.sing())
# print(human.cry())
# print(animal.cry())

# 古いパッケージを使っているときに切り替えできるように使ってみる
try:
    from my_package import utils
except ImportError:
    from my_package.tools import utils

utils.say_twice('word')
