from typing import Collection


def say_something():
    s = 'hi'
    return s


result = say_something()
print(result)


def what_is_this(color):
    if color == 'red':
        return 'tomato'
    elif color == 'green':
        return 'green pepper'
    else:
        return 'I don\'t know'


result = what_is_this('red')
print(result)

num: int = 10


def add_num(a: int, b: int) -> int:
    return a + b


r = add_num(10, 20)
print(r)


def menu(entree='beef', drink='wine', dessert='ice'):
    print(entree)
    print(drink)
    print(dessert)


menu()

menu(entree='beef', dessert='ice', drink='beer')


# リストはデフォルト引数では渡さな方が良い
# 参照渡しになってくるため
# def test_func(x, l=[]):
#     l.append(x)
#     return l

# Noneを用いて、空のリストを作るようにする
def test_func(x, l=None):
    if l is None:
        l = []
    l.append(x)
    return l


y = [1, 2, 3]
r = test_func(100, y)
print(r)

r = test_func(100)
r = test_func(100)
print(r)  # 100 が一つ入っている訳でない


def say_something_2(word, *args):
    print(word)
    for arg in args:
        print(arg)


# タプル化して渡すこともできる
t = ('Mike', 'Nance')
say_something_2('Hi!', *t)


# 順序大事
def menu2(food, *args, **kwargs):
    print(food)
    print(args)
    for k, v in kwargs.items():
        print(k, v)


d = {
    'entree': 'beef',
    'drink': 'ice coffee',
    'dessert': 'ice'
}

menu2('test', 'test2', 'test3', **d)


def example_func(param1, param2):
    """Example

    Args:
      param1 (int): The first parameter
      param2 (int): The second parameter

    Returns:
      bool: The return Value.
    """
    print(param1)
    print(param2)
    return True


print(example_func.__doc__)

# 関数内だけで扱う関数


def outer(a, b):
    def plus(c, d):
        return c + d
    r = plus(a, b)
    print(r)


outer(1, 2)
