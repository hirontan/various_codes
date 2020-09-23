"""
CRITICAL
ERROR
WARNING
INFO
DEBUG
"""

import logging

# 標準ドキュメントをみると、フォーマットで利用できるものがわかる
formatter = '%(asctime)s:%(levelname)s:%(message)s'
logging.basicConfig(filename='test.log', level=logging.INFO, format=formatter)

# logging.info('info {}'.format('test'))
# logging.info('info %s %s' % ('test', 'test'))
logging.info('info %s %s', 'test', 'test')
