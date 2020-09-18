# １行が長くなる時
s = 'aaaaaa' \
    + 'bbbbbbb'
print(s)


s = ('aaaaaa'
     + 'bbbbbbb')
print(s)

# if文
x = 10
if x < 0:
    print('nagetive')
elif x == 0:
    print('zero')
else:
    print('positive')

is_ok = True

if not is_ok:
    print("hello")
else:
    print("else")

# 1の場合でもTrue（値が入っている場合）。0の場合False（値が入っていない場合も）
# False: 0, 0.0, '', [], {}, (), set()
# is_ok = True
is_ok = 1

if is_ok:
    print('OK!')
else:
    print("else")

# null オブジェクト: None
is_empty = None
print(is_empty)

if is_empty is None:
    print('None!!')

print(1 == True)
print(1 is True)  # False になる。同じものであるかどうかを判定する

count = 0
while count < 5:
    print(count)
    count += 1
else:
    print('done')

count = 0
while True:
    if count >= 5:
        break  # elseには入らない
    if count == 2:
        count += 1
        continue

    print(count)
    count += 1

# input 試してみる
# while True:
#     word = input('Enter:')
#     if word == 'ok':
#         break
#     print(next)

some_list = [1, 2, 3, 4, 5]
i = 0
# while i < len(some_list):
#   print(some_list[i])
#   i += 1

for i in some_list:
    print(i)

for fruit in ['apple', 'banana', 'orange']:
    # if fruit == 'banana':
    #     print('stop eating')
    #     break
    print(fruit)
else:
    print('I ate all!')

# _ を使うと、コードの中では使わないと判断できる
for i in range(2, 10, 3):
    print(i)


# indexをつける
for i, fruit in enumerate(['apple', 'banana', 'orange']):
    print(i, fruit)

days = ['Mon', 'Tue', 'Wed']
fruits = ['apple', 'banana', 'orange']
drinks = ['coffee', 'tea', 'beer']

for day, fruit, drink in zip(days, fruits, drinks):
    print(day, fruit, drink)

d = {'x': 100, 'y': 200}

print(d.items())
for k, v in d.items():  # アンパッキングでkとvに入る
    print(k, ':', v)

# リスト内包表記
t = (1, 2, 3, 4, 5)
t2 = (5, 6, 7, 8, 9, 10)

r = []
for i in t:
    r.append(i)

print(r)

r = [i for i in t if i & 2 == 0]
print(r)

r = []
for i in t:
    for j in t2:
        r.append(i + j)

print(r)
r = [i * j for i in t for j in t2]
print(r)


# 辞書包括表記
w = ['mon', 'tue', 'wed']
f = ['coffee', 'milk', 'water']

d = {}
for x, y in zip(w, f):
    d[x] = y

print(d)

d = {x: y for x, y in zip(w, f)}
print(d)

# 集合内包表記
s = set()

for i in range(10):
    if i % 2 == 0:
        s.add(i)

print(s)

s = {i for i in range(10) if i % 2 == 0}
print(s)
