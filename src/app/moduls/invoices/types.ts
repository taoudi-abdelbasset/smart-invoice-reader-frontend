export type ContactType = "email" | "phone";

export type Contact = {
  id: string;
  type: ContactType;
  value: string;
  country: string | null;
  created_at: string;
  deleted_at: string | null;
};

export type Company = {
  id: string;
  name: string;
  address: string | null;
  country: string | null;
  created_at: string;
  deleted_at: string | null;
  contacts: Contact[];
};

export type BusinessEntity = {
  id: string;
  first_name: string;
  last_name: string;
  address: string | null;
  country: string | null;
  created_at: string;
  deleted_at: string | null;
  contacts: Contact[];
};

export type InvoiceItem = {
  id: string;
  index: number | null;
  item_name: string;
  qte: number;
  unit_price: number;
  tax_rate: number;
  created_at: string;
  deleted_at: string | null;
};

export type Invoice = {
  id: string;
  invoice_number: string;
  invoice_date: string | null;
  due_date: string | null;
  note: string | null;
  currency: string | null;
  subtotal: number | null;
  tax_amount: number | null;
  total_amount: number | null;
  payment_method: string | null;
  items: InvoiceItem[];
  issuer_company: Company | null;
  issuer: BusinessEntity | null;
  buyer_company: Company | null;
  buyer: BusinessEntity | null;
  created_at: string;
  deleted_at: string | null;
  file: {
    id: string;
    file_name: string;
    conversation_id: string;
    created_at: string;
  };
};
