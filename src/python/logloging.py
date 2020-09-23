"""
CRITICAL
ERROR
WARNING
INFO
DEBUG
"""

import logging

import log_test

logging.basicConfig(filename='test.log', level=logging.INFO)

# 標準ドキュメントをみると、フォーマットで利用できるものがわかる
# formatter = '%(asctime)s:%(levelname)s:%(message)s'
# logging.basicConfig(filename='test.log', level=logging.INFO, format=formatter)

# logging.info('info {}'.format('test'))
# logging.info('info %s %s' % ('test', 'test'))
logging.info('info %s %s', 'test', 'test')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.debug('debug')

log_test.do_something()
