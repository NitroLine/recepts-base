from pydantic import BaseModel


class Receipt(BaseModel):
    name: str
    receipt: str


class ReceiptOutput(BaseModel):
    name: str
    receipt: str
    receipt_id: str


class ReceiptOutputDto(BaseModel):
    receipts: list[ReceiptOutput]
    count: int


class CreateOutputDto(BaseModel):
    created_id: str
    replica_id: str
    backend_version: str


class InfoOutputDto(BaseModel):
    backend_version: str
    replica_id: str