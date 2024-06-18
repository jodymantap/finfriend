export interface TransactionData {
  item: string;
  transactionType: string;
  transactionCategory: string;
  nominal: number;
}
export interface Credentials {
  sheetURL: string;
  apiEndpoint: string;
  apiToken: string;
}
