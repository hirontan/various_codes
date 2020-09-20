import collections
import os
import sys

import termcolor

# ローカルのライブラリが先に読み込まれてしまう
import my_package

import config

print(collections.__file__)
print(termcolor.__file__)
print(my_package.__file__)
print(config.__file__)

print(sys.path)
