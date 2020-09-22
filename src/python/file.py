# f = open('test.txt', 'w')
# f = open('test.txt', 'a')
# f.write('test\n')
# print('My', 'name', 'is', 'Mike', sep='#', file=f)

# # メモリを使ってしまう
# f.close()


# with ステートメントを利用するとcloseを行ってくれる
import string
with open('test.txt', 'w') as f:
    f.write('test\n')

s = """\
AAA
BBB
CCC
DDD
"""

# 書き込み + 読み込み
with open('test.txt', 'w+') as f:
    f.write(s)
    f.seek(0)
    print(f.read())

# 読み込み + 書き込み
with open('test.txt', 'r+') as f:
    f.write(s)
    f.seek(0)
    print(f.read())


# with open("test.txt", 'r') as f:
#     # while True:
#     #     chunk = 2
#     #     line = f.read(chunk)
#     #     print(line)
#     #     if not line:
#     #         break
#     # ファイルの読み出し位置を戻したい
#     print(f.tell())
#     print(f.read(1))
#     f.seek(5)
#     print(f.read(1))
#     f.seek(14)
#     print(f.read(1))
#     f.seek(15)
#     print(f.read(1))
#     f.seek(5)
#     print(f.read(1))


s = """\

Hi $name.

$contents

Have a goof day
"""

with open('./email_template.txt') as f:
    t = string.Template(s)
contents = t.substitute(name="Mike", contents="How are you?")
print(contents)
