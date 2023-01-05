import os

DB_REGION_NAME = os.environ.get('DB_REGION_NAME', "ru-central1")
DB_ENDPOINT_URL = os.environ.get('DOCUMENT_API_ENDPOINT', "")
AWS_PRIVATE_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY", "")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID", "")
BACKEND_VERSION = os.environ.get("APP_VERSION", "Unknown")