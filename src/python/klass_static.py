class Person(object):
    kind = 'human'

    def __init__(self):
        self.x = 100

    # まだオブジェクトでない場合でもクラスメソッドにアクセスできる
    @classmethod
    def what_is_your_kind(cls):
        return cls.kind

    # スタティックメソッドはあまり使う機会はなさそう
    @staticmethod
    def about(year):
        print('about human {}'.format(year))


a = Person()
print(a.what_is_your_kind())
b = Person
print(b.what_is_your_kind())

Person.about(1999)
