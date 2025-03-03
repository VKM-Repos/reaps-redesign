import { RequestItems } from "./requests";

interface TransactionList {
  items: TransactionItem[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

interface TransactionItem {
  id: string;
  transaction_reference: string;
  amount: number;
  status: string;
  rrr: string;
  description: string;
  request: RequestItems;
}

interface ManualTransactionItem {
  id: string;
  fullName: string;
  email: number;
  status: string;
  created_at: string;
  evidence_of_payment: string;
}
