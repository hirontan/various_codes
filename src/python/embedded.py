import builtins

# https://docs.python.org/ja/3/library/functions.html
print(globals())

builtins.print()

ranking = {
    'A': 100,
    'B': 85,
    'C': 95
}

# ranking.get('A')

print(sorted(ranking, key=ranking.get))

print(sorted(ranking, key=ranking.get, reverse=True))
