class Person(object):
    def talk(self):
        print('talk')

    def run(self):
        print('person run')


class Car(object):
    def run(self):
        print('run')

# メソッドが同じの場合は、先に読み込ませたクラスが優先される


class PersonCarRobot(Person, Car):
    def fly(self):
        print('fly')


person_car_robot = PersonCarRobot()
person_car_robot.talk()
person_car_robot.run()
person_car_robot.fly()
