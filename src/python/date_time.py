import shutil
import os
import time
import datetime


now = datetime.datetime.now()
print(now)
print(now.isoformat())
print(now.strftime('%d/%m/%y-%H%M%S%f'))

today = datetime.date.today()
print(today)
print(today.isoformat())
print(today.strftime('%d/%m/%y'))

t = datetime.time(hour=1, minute=10, second=5, microsecond=100)
print(t)
print(t.isoformat())
print(t.strftime('%H_%M_%S_%f'))

print(now)
# d = datetime.timedelta(weeks=1)
d = datetime.timedelta(days=365)
# d = datetime.timedelta(hours=1)
# d = datetime.timedelta(seconds=1)
print(now - d)


print('###')
time.sleep(2)
print('###')

print(time.time())


file_name = 'test.txt'
if os.path.exists(file_name):
    shutil.copy(file_name, "{}.{}".format(
        file_name, now.strftime('%Y_%m_%y-%H_%S%f')))

with open(file_name, 'w') as f:
    f.write('test')
