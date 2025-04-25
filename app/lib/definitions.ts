export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
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

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

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
  created_by?: string;
  created_at: string;
  updated_at?: string;
};

// PRACTICES
export type Practice = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  duration_min?: number;
  created_at: string;
  updated_at?: string;
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
  created_at: string;
  updated_at?: string;
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
