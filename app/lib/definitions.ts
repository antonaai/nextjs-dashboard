export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestPayment = {
  id: string;
  name: string;
  email: string;
  amount: string;
}

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type LatestPaymentsRaw = Omit<LatestPayment, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type PaymentsTable = {
  id: string;
  amount: number;
  method: string;
  date: string;
  notes: string;
  name: string;
  email: string;
}

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type ClientType = {
  id: string;
  name: string;
  email: string;
  phone: string,
  notes?: string,
  vat_number?: string,
  fiscal_code?: string,
  address: string,
  zip_code: string,
  city: string,
  province: string,
  country: string,
  sdi_code?: string,
  pec_email?: string,
  contact_person?: string,
  type: string,
  created_by: string, 
  created_at?: string,
};

export type ClientsTableType = {
  id: string;
  name: string;
  email: string;
  phone: string,
  type: string,
  total_open: number,
  total_in_progress: number,
  total_closed: number,
  total_practices: number
};

export type FormattedClientsTable = {
  id: string;
  name: string;
  email: string;
  phone: string,
  type: string,
  total_open: string,
  total_in_progress: string,
  total_closed: string,
  total_practices: number
}

export type PracticesTableType = {
  id: string;
  practice_code?: string;
  name: string;
  description?: string;
  price: number;
  duration_min?: number;
  status: 'open' | 'in_progress' | 'closed' | 'archived' | string;
  type: 'civil' | 'criminal' | 'labor' | 'tax' | 'corporate' | 'family' | 'other' | string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | string;
  created_at: 'string',
  client_name: 'string',
}

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

// USERS
export type User_New = {
  id: string;
  email: string;
  password_hash?: string;
  name?: string;
  role: 'admin' | 'staff' | 'viewer' | string;
  created_at: string;
  updated_at?: string;
};

// CLIENTS
export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  vat_number: string;
  fiscal_code: string;
  address: string;
  zip_code: string;
  city: string;
  province: string;
  country: string;
  sdi_code: string;
  pec_email: string;
  contact_person: string;
  type: string
};

export type ClientForm = {
  id: string;
  name: string,
  email: string;
  phone: string;
  notes?: string;
  vat_number?: string;
  fiscal_code?: string;
  address: string;
  zip_code: string;
  city: string;
  province: string;
  country: string;
  sdi_code?: string;
  pec_email?: string;
  contact_person?: string;
  type: string
};

// PRACTICES
export type Practice = {
  id: string;
  practice_code: string;
  name: string;
  description: string;
  client_id: string;
  price: number;
  duration_min: number;
  status: string;
  type: string;
  opening_date: string;
  closing_date: string;
  assigned_to: string;
  priority: string;
};

// APPOINTMENTS
export type Appointment = {
  id: string;
  client_id: string;
  practice_id?: string;
  user_id?: string;
  start_time: string;
  end_time?: string;
  status: 'confirmed' | 'canceled' | 'completed' | string;
  notes?: string;
};

// PAYMENTS
export type Payment = {
  id: string;
  client_id?: string;
  appointment_id?: string;
  amount: number;
  method?: 'cash' | 'card' | 'paypal' | string;
  paid_at: string;
  notes?: string;
};

// TAGS
export type Tag = {
  id: string;
  name: string;
  type: 'client' | 'practice';
};

// CLIENT TAGS (join table)
export type ClientTag = {
  client_id: string;
  tag_id: string;
};

// PRACTICE TAGS (join table)
export type PracticeTag = {
  practice_id: string;
  tag_id: string;
};

export type ClientWithTags = Client & {
  tags: Tag[];
};

export type AppointmentWithDetails = Appointment & {
  client: Client;
  practice: Practice;
  user: User;
};

export type PaymentSummary = {
  id: string;
  client_name: string;
  appointment_date: string;
  amount: number;
  method: string;
};
