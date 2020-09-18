import math

print('Hi', 'Mike', sep=',', end='.\n')

print(2 + 2)

result = math.sqrt(25)
print(result)

y = math.log2(10)
print(y)

# print(help(math))

print("hello")
print("say \" I don\'t know\"")


print("""\
line1
line2
line3\
""")

t = (1, 2, 4, 5, 1, 2)
print(type(t))  # 値を代入することを受け付けていない

t = ([1, 2, 3], [4, 5, 6])
t[0][0] = 100
print(t)

t = 1,  # カンマ入れるとタプルになる
print(type(t))

t = (1)  # こっちはinteger
print(type(t))

# タプルのアンパッキング
num_tuple = (10, 20)
x, y = num_tuple
print(x, y)

a = 100
b = 200
a, b = b, a
print(a, b)

# 辞書型
d = {'x': 10, 'y': 20}
print(d)
d['z'] = 10000
print(d)

print(dict(a=10, b=20))

print(d.keys())
print(d.values())

d2 = {'x': 1000, 'j': 2000}
d.update(d2)
print(d.get('x'))
d.pop('x')
print(d)
del d['y']
print(d)
d.clear()

# 集合
a = {1, 2, 4, 7, 8}
b = {3, 4, 6, 8}

print(a - b)
print(b - a)
print(b & a)
print(b | a)
print(b ^ a)  # 排他
