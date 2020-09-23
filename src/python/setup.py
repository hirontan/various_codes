# python setup.py sdist

# from distutils.core import setup
from setuptools import setup, find_packages

setup(
    name='my_package',
    version='1.0.0',
    packages=['my_package', 'my_package.talk', 'my_package.tools'],
    license='Free',
    author='hirontan',
    description='Sample package'
    test_suits='tests'
)
