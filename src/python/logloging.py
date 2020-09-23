"""
CRITICAL
ERROR
WARNING
INFO
DEBUG
"""

import logging

logging.basicConfig(filename='test.log', level=logging.INFO)

# logging.info('info {}'.format('test'))
# logging.info('info %s %s' % ('test', 'test'))
logging.info('info %s %s', 'test', 'test')
