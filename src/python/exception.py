l = [1, 2, 3]
i = 5
del l

# https://airbrake.io/blog/python-exception-handling/class-hierarchy
try:
    l[i]
except IndexError as ex:
    print("Don't worry: {}".format(ex))
except NameError as ex:
    print(ex)
except Exception as ex:
    print('other: {}'.format(ex))
else:
    print('done')
finally:
    print("clean up")


# 独自例外

# raise IndexError('test error')

class UppercaseError(Exception):
    pass


def check():
    words = ['apple', 'orange', 'banana']
    for word in words:
        if word.isupper():
            raise UppercaseError(word)


try:
    check()
except UppercaseError as exc:
    print('This is my fault. Go next')
