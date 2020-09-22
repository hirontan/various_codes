# Python2の名残でobjectと書いておくと方が良い
from os import name


class Person(object):
    def __init__(self, name):
        self.name = name
        print(self.name)

    def say_somthing(self):
        print('I am {}.'.format(self.name))
        self.run(10)

    def run(self, num):
        print('run' * num)


person = Person('Mike')
person.say_somthing()
