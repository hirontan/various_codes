# f = open('test.txt', 'w')
# f = open('test.txt', 'a')
# f.write('test\n')
# print('My', 'name', 'is', 'Mike', sep='#', file=f)

# # メモリを使ってしまう
# f.close()


# with ステートメントを利用するとcloseを行ってくれる
with open('test.txt', 'w') as f:
    f.write('test\n')

s = """\
AAA
BBB
CCC
DDD
"""

with open("test.txt", 'r') as f:
    while True:
        chunk = 2
        line = f.read(chunk)
        print(line)
        if not line:
            break
