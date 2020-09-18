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
