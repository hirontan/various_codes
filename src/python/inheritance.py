class Car(object):
    def __init__(self, model=None):
        self.model = model

    def run(self):
        print('run')


class ToyotaCar(Car):
    def run(self):
        print('fast')


class TeslaCar(Car):
    def __init__(self, model='Model S', enable_auto_run=False):
        # self.model = model
        super().__init__(model)
        self.enable_auto_run = enable_auto_run

    def run(self):
        print('fffffast')

    def auto_run(self):
        print('auto run')


car = Car()
car.run()

toyota_car = ToyotaCar('Lexes')
print(toyota_car.model)
toyota_car.run()

tesla_car = TeslaCar('Model S')
print(tesla_car.model)
tesla_car.run()
tesla_car.auto_run()
