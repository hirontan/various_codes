import tarfile

with tarfile.open('test.tar.gz', 'w:gz') as tr:
    tr.add('test_dir')

with tarfile.open('test.tar.tar.gz', 'r:gz') as tr:
    # tr.extractall(path='test_dir')
    with tr.extractfile('test_dir/sub_dir/sub_test.txt') as f:
        print(f.read())
