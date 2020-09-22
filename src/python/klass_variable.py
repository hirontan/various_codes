class Person(object):
    # 作ったオブジェクトの中で共有される
    kind = 'human'

    def __init__(self, name):
        self.name = name

    def who_are_you(self):
        print(self.name, self.kind)


a = Person('A')
a.who_are_you()
b = Person('B')
b.who_are_you()


class T(object):
    words = []

    def add_word(self, word):
        self.words.append(word)


c = T()
c.add_word('add 1')
c.add_word('add 2')

# この場合はリストが共有されてしまうから気を付ける
# できるだけ、__init__内で初期化する
d = T()
d.add_word('add 3')
d.add_word('add 4')
print(c.words)
