class Car(object):
    def __init__(self, model=None):
        self.model = model

    def run(self):
        print('run')


class ToyotaCar(Car):
    def run(self):
        print('fast')


class TeslaCar(Car):
    def __init__(self, model='Model S', enable_auto_run=False, passwd='123'):
        # self.model = model
        super().__init__(model)
        # もしクラスの中だけで扱いたい変数がある場合、__enable_auto_runでアンダースコアを二つつける
        # アンダースコア一つの場合は、外部から触って欲しくない場合に扱う（実際には扱えるそこ、@propertyで制御）
        self._enable_auto_run = enable_auto_run
        self.passwd = passwd

    @property
    def enable_auto_run(self):
        return self._enable_auto_run

    @enable_auto_run.setter
    def enable_auto_run(self, is_enable):
        if self.passwd == '456':
            self._enable_auto_run = is_enable
        else:
            raise ValueError

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

tesla_car = TeslaCar('Model S', passwd='111')
tesla_car.enable_auto_run = True
print(tesla_car._enable_auto_run)
