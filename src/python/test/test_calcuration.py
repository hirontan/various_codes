import pytest
# import unittest

import os
import calcuration


class TestCal(object):
    @classmethod
    def setup_class(cls):
        print('start')
        cls.cal = calcuration.Cal()
        cls.test_dir = '/tmp/test_dir'
        cls.test_file_name = 'test.txt'

    @classmethod
    def teardown_class(cls):
        import shutil
        print('end')
        if os.path.exists(cls.test_dir):
            shutil.rmtree(cls.test_dir)
        del cls.cal

    def setup_method(self, method):
        print('method={}'.format(method.__name__))
        # self.cal = calcuration.Cal()

    # テストをし終わった後に実行する
    def teardown_method(self, method):
        print('method={}'.format(method.__name__))
        # sdel self.cal

    def test_save_no_dir(self):
        self.cal.save(self.test_dir, self.test_file_name)
        test_file_name = os.path.join(self.test_dir, self.test_file_name)
        assert os.path.exists(test_file_name) is False

    # def test_add_num_and_double(self, request):
    #     request.config.getoption()
    def test_add_num_and_double(self, csv_file):
        print(csv_file)
        assert self.cal.add_num_and_double(1, 1) == 4

    # def test_add_num_and_double(self, tmpdir):
    #     print(tmpdir)
    #     os_name = 'mac'
    #     if os_name == 'mac':
    #         print('ls')
    #     elif os_name == 'windows':
    #         print('dir')
    #     assert self.cal.add_num_and_double(1, 1) == 4

    def test_save(self, tmpdir):
        self.cal.save(tmpdir, self.test_file_name)
        test_file_path = os.path.join(tmpdir, self.test_file_name)
        assert os.path.exists(test_file_path) is False

    # @pytest.mark.skip(reason='skip!')
    # @pytest.mark.skipif(is_release=False, reason='skip!')
    def test_add_num_and_double_raise(self):
        with pytest.raises(ValueError):
            self.cal.add_num_and_double('1', '1')


# import calcuration

# release_name = 'lesson'


# class CalTest(unittest.TestCase):
#     # テストをする前に実行する
#     def setUp(self):
#         print('setup')
#         self.cal = calcuration.Cal()

#     # テストをし終わった後に実行する
#     def tearDown(self):
#         print('clean up')
#         del self.cal

#     # テストのスキップ
#     # @unittest.skip('xxxxx')
#     @unittest.skipIf(release_name == 'lesson', 'skip!')
#     def test_add_num_and_double(self):
#         self.assertEqual(self.cal.add_num_and_double(1, 1), 4)

#     def test_add_num_and_double_raise(self):
#         with self.assertRaises(ValueError):
#             self.cal.add_num_and_double('1', '1')


if __name__ == "__main__":
    # unittest.main()
    pytest.main()
