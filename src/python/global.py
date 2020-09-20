import config

import my_package.talk.animal


def main():
    my_package.talk.animal.sing()


print('global: ', __name__)

if __name__ == '__main__':
    main()
