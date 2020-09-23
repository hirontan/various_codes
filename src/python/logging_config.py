import logging.config

# logging.config.dictConfigで読み込むこともできる
logging.config.fileConfig('logging.ini')

# logger = logging.getLogger(__name__)
logger = logging.getLogger('simpleExample')

logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')

# ログ解析などで辞書型で出力すると良い時もある
logger.warning({'message': 'warn message'})
