import subprocess

subprocess.run(['ls', '-al'])

# シェルでパプなどを使いたい時に shell=Trueとか使える。Shellインジェクションがあるので、基本的には使わない
# subprocess.run('ls -al | grep test', shell=True)

# Exceptiomをあげてくれる
# r = subprocess.run('ls', shell=True, check=True)

p1 = subprocess.Popen(['ls', '-al'], stdout=subprocess.PIPE)
p2 = subprocess.Popen(['grep', 'test'], stdin=p1.stdout,
                      stdout=subprocess.PIPE)
