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
