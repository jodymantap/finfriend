export interface TransactionData {
  id?: string;
  item: string;
  transactionType: string;
  transactionCategory: string;
  nominal: string;
}
export interface Credentials {
  sheetURL: string;
  apiEndpoint: string;
  apiToken: string;
}
