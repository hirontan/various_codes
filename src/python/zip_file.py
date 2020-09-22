import glob
import zipfile

with zipfile.ZipFile('test.zip', 'w') as z:
    # z.write('test_dir')
    # z.write('test/test.txt')
    for f in glob.glob('test_dir/**', recursive=True):
        print(f)
        z.write(f)

with ziofile.ZipFile('test.zip', 'r') as z:
    with z.open('test_dir/test.txt') as f:
        print(f.read())
