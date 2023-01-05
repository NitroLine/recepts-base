import os

from fastapi import FastAPI, HTTPException
import boto3
from uuid import uuid1
from config import DB_REGION_NAME, DB_ENDPOINT_URL, AWS_PRIVATE_KEY, AWS_ACCESS_KEY_ID, BACKEND_VERSION
from models import InfoOutputDto, ReceiptOutputDto, CreateOutputDto, Receipt
import uvicorn

app = FastAPI()

ydb_docapi_client = boto3.resource('dynamodb',
                                   region_name=DB_REGION_NAME,
                                   endpoint_url=DB_ENDPOINT_URL,
                                   aws_access_key_id=AWS_ACCESS_KEY_ID,
                                   aws_secret_access_key=AWS_PRIVATE_KEY)

table = ydb_docapi_client.Table('documentapidb/replica')


@app.get("/")
async def root_info():
    return {"description": "Рецепты.", "type": "api"}


@app.get("/api/info", response_model=InfoOutputDto)
async def replica_info():
    return {"backend_version": BACKEND_VERSION, "replica_id": replica_id}


@app.get("/api/receipts", response_model=ReceiptOutputDto)
async def receipts():
    ydb_docapi_client = boto3.resource('dynamodb',
                                       region_name=DB_REGION_NAME,
                                       endpoint_url=DB_ENDPOINT_URL,
                                       aws_access_key_id=AWS_ACCESS_KEY_ID,
                                       aws_secret_access_key=AWS_PRIVATE_KEY)
    table = ydb_docapi_client.Table('documentapidb/receipts')
    items = []
    scan_kwargs = {}
    done = False
    start_key = None
    response = {}
    while not done:
        if start_key:
            scan_kwargs['ExclusiveStartKey'] = start_key
        response = table.scan(**scan_kwargs)
        items += response.get('Items', [])
        start_key = response.get('LastEvaluatedKey', None)
        done = start_key is None
    return {"receipts": items, "count": response.get("Count", 0)}


@app.post("/api/receipts", response_model=CreateOutputDto)
async def new_receipt(receipt: Receipt):
    ydb_docapi_client = boto3.resource('dynamodb',
                                       region_name=DB_REGION_NAME,
                                       endpoint_url=DB_ENDPOINT_URL,
                                       aws_access_key_id=AWS_ACCESS_KEY_ID,
                                       aws_secret_access_key=AWS_PRIVATE_KEY)
    table = ydb_docapi_client.Table('documentapidb/receipts')
    receipt_id = uuid1().hex
    table.put_item(
        Item={
            'receipt_id': receipt_id,
            'name': receipt.name,
            'receipt': receipt.receipt
        }
    )
    return {"created_id": receipt_id, "replica_id": replica_id, "backend_version": BACKEND_VERSION}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))