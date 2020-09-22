# Python2の名残でobjectと書いておくと方が良い
class Person(object):
    def say_somthing(self):
        print('hello')


person = Person()
person.say_somthing()
