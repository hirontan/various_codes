"""
web_server:
  host: 127.0.0.1
  port: 80
db_server:
  host: 127.0.0.1
  port: 3306
"""

import yaml

with open('config.yml', 'w') as yaml_file:
    # default_flow_styleを設定することで、ブロックスタイルで書き込める
    # ない場合は、フロースタイル
    yaml.dump({
        'web_server': {
            'host': '127.0.0.1',
            'port': 80
        },
        'db_server': {
            'host': '127.0.0.1',
            'port': 3306
        }
    }, yaml_file, default_flow_style=False)

with open('config.yml', 'r') as yaml_file:
    data = yaml.load(yaml_file)
    print(data, type(data))
    print(data['web_server']['port'])
