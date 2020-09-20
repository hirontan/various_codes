# https://docs.python.org/ja/3/library/index.html

from collections import defaultdict
s = "adasdgafkjalfjmOImadcaaskdj"

d = {}
for c in s:
    if c not in d:
        d[c] = 0
    d[c] += 1
print(d)

d = {}
for c in s:
    d.setdefault(c, 0)
    d[c] += 1
print(d)


d = defaultdict(int)

for c in s:
    d[c] += 1
print(d)

print(d['f'])
