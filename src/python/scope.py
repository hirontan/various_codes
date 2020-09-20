"""
Test Test ##############################
名前空間とスコープ
"""

animal = 'cat'


def f():
    # global animal = 'dog'
    print('local:', locals)
    print(f.__name__)
    print(f.__doc__)


f()
print(__name__)
print('global:', animal)
print('global:', globals)
