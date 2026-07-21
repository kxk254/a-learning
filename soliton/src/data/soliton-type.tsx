export interface Invoice {
  id: number;
  tenant_name: string;
  bukken_name: string;
  invoiceid: string;
  room_no: string;
  report_date: string;
  revenue_bt_ttl_0: number;
  revenue_bt_ttl: number;
  tax_ttl: number;
  revenue_at_ttl: number;
  revenue_bt_gttl: number;
  revenue_tax_gttl: number;
  revenue_at_gttl: number;
  pdf_issued_date: string | null;
  mail_sent_date: string | null;
  revenue: number;
  tenant: number;
  bukken: number;
}

export interface Revenue {
  id: number;
  tenant_name: string;
  bukken_name: string;
  account_code_name: string;
  report_date: string;
  start_date: string;
  end_date: string;
  invoice_date: string;
  receipt_date: string;
  revenue_bt: number;
  revenue_tax: number;
  revenue_at: number;
  invoiceid: string;
  invoice_processed: boolean;
  invoice_head_note: string;
  note: string | null;
  tenant: number;
  bukken: number;
  contract: number;
  account_code: number;
}

type Tenant = { id: number; name: string };

type Bukken = { id: number; name: string };
