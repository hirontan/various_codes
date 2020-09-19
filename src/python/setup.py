# python setup.py sdist

from distutils.core import setup

setup(
    name='my_package',
    version='1.0.0',
    packages=['my_package', 'my_package.talk', 'my_package.tools'],
    license='Free',
    author='hirontan',
    description='Sample package'
)
