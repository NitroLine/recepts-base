import os

DB_REGION_NAME = os.environ.get('DB_REGION_NAME', "ru-central1")
DB_ENDPOINT_URL = os.environ.get('DOCUMENT_API_ENDPOINT', "https://docapi.serverless.yandexcloud.net/ru-central1/b1g2s4sv2rqkol4efgqc/etnanapk10bkaclvu7f6")
AWS_PRIVATE_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "YCNNjIV6cfJWubanvJzfC_oYZhcToo4WefET1-0-")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "YCAJE0qGoyfc5g4N38_rrVDQh")
BACKEND_VERSION = os.environ.get("APP_VERSION", "Unknown")