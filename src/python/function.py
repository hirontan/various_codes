from types import coroutine
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


def outer2(a, b):
    def inner():
        return a + b
    return inner


# 実行するための関数を返す。後ほど実行したい場合にクロージャーを扱う
f = outer2(1, 2)
r = f()
print(r)


def circle_area_func(pi):
    def circle_area(radius):
        return pi * radius * radius
    return circle_area


ca1 = circle_area_func(3.14)
ca2 = circle_area_func(3.141592)

print(ca1(10))
print(ca2(10))


def print_more(func):
    def wrapper(*args, **kwargs):
        print('func:', func.__name__)
        print('args:', args)
        print('kwargs:', kwargs)

        result = func(*args, **kwargs)
        print('result:', result)
        return result
    return wrapper


def print_info(func):
    def wrapper(*args, **kwargs):
        print('start')

        result = func(*args, **kwargs)
        print('end')
        return result
    return wrapper


@print_info  # デコレータ（前後に処理したい場合に扱う）
@print_more
def add_num(a, b):
    return a + b


r = add_num(10, 20)
print(r)

# print('start')
# r = add_num(10, 20)
# print('end')
# print(r)

l = ['Mon', 'tue', 'Wed', 'Thu', 'fri', 'sat', 'Sun']


def change_words(words, func):
    for word in words:
        print(func(word))


def sample_func(word):
    return word.capitalize()


def sample_func2(word):
    return word.lower()

# sample_func = lambda word: word.capitalize()


# change_words(l, sample_func)
change_words(l, lambda word: word.capitalize())
change_words(l, lambda word: word.lower())


# ジェネレータ
l = ['Good morning', 'Goof afternoon', 'Good night']

for i in l:
    print(i)

print("###########")


def counter(num=10):
    for _ in range(num):
        yield 'run'


def greeting():
    yield 'Good morning'
    yield 'Goof afternoon'
    yield 'Good night'

# for g in greeting():
#   print(g)


g = greeting()
c = counter()


print(next(g))

print(next(c))
print(next(c))
print(next(c))
print(next(c))
print(next(c))


print('@@@@@')

print(next(g))

print(next(c))
print(next(c))
print(next(c))
print(next(c))
print(next(c))

print('@@@@@')

print(next(g))


# ジェネレータ内包表記
def g():
    for i in range(10):
        yield i


g = g()
# g = tuple(i for i in range(10))
g = (i for i in range(10) if i % 2 == 0)

# print(type(g))
# print(g)

for x in g:
    print(x)
