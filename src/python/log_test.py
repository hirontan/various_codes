import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


h = logging.FileHandler('logtest.log')
logger.addHandler(h)


def do_something():
    logger.info('from logtest')
