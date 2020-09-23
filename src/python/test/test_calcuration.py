import unittest

import calcuration

release_name = 'lesson'


class CalTest(unittest.TestCase):
    # テストをする前に実行する
    def setUp(self):
        print('setup')
        self.cal = calcuration.Cal()

    # テストをし終わった後に実行する
    def tearDown(self):
        print('clean up')
        del self.cal

    # テストのスキップ
    # @unittest.skip('xxxxx')
    @unittest.skipIf(release_name == 'lesson', 'skip!')
    def test_add_num_and_double(self):
        self.assertEqual(self.cal.add_num_and_double(1, 1), 4)

    def test_add_num_and_double_raise(self):
        with self.assertRaises(ValueError):
            self.cal.add_num_and_double('1', '1')


if __name__ == "__main__":
    unittest.main()
