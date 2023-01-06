export interface BackendInfo {
    backend_version: string,
    replica_id: string
}

export interface Receipt {
    name: string,
    receipt: string
    receipt_id: string
}

export interface CreateResults extends  BackendInfo{
    created_id: string
}

export interface ReceiptsListResults {
    receipts: Array<Receipt>
    count: number
}