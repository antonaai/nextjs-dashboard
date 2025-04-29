import postgres from 'postgres';
import {
  CustomerField,
  PracticesTableType,
  ClientsTableType,
  InvoiceForm,
  InvoicesTable,
  PaymentsTable,
  LatestInvoiceRaw,
  Revenue,
  Client,
} from './definitions';
import { formatCurrency } from './utils';
const ITEMS_PER_PAGE = 6;

const sql = postgres(process.env.LEXLY_SUPABASE_POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredPayments(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const payments = await sql<PaymentsTable[]>`
      SELECT
        payments.id,
        payments.amount,
        payments.method,
        payments.paid_at AS date,
        payments.notes,
        clients.name,
        clients.email
      FROM payments
      JOIN clients ON payments.client_id = clients.id
      WHERE
        clients.name ILIKE ${`%${query}%`} OR
        clients.email ILIKE ${`%${query}%`} OR
        payments.amount::text ILIKE ${`%${query}%`} OR
        payments.method ILIKE ${`%${query}%`}
      ORDER BY payments.paid_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return payments;
  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch payments.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchPaymentsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM payments
    JOIN clients ON payments.client_id = clients.id
    WHERE
      clients.name ILIKE ${`%${query}%`} OR
      clients.email ILIKE ${`%${query}%`} OR
      payments.amount::text ILIKE ${`%${query}%`} OR
      payments.notes ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;

  } catch (error) {
    console.error('Database Error: ', error);
    throw new Error('Failed to fetch total number of payments.');
  }
}

export async function fetchPracticesPage(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM practices
    JOIN clients ON practices.client_id = clients.id
    WHERE
      clients.name ILIKE ${`%${query}%`} OR
      clients.email ILIKE ${`%${query}%`} OR
      practices.price::text ILIKE ${`%${query}%`} OR
      practices.created_at::text ILIKE ${`%${query}%`} OR
      practices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of practices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredPractices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const practices = await sql<PracticesTableType[]>`
      SELECT
        practices.id,
        practices.practice_code,
        practices.name,
        practices.description,
        practices.price,
        practices.duration_min,
        practices.status,
        practices.type,
        practices.priority,
        practices.created_at,
        clients.name AS client_name
      FROM practices
      LEFT JOIN clients ON practices.client_id = clients.id
      WHERE
        practices.name ILIKE ${`%${query}%`} OR
        practices.practice_code ILIKE ${`%${query}%`} OR
        clients.name ILIKE ${`%${query}%`} OR
        clients.email ILIKE ${`%${query}%`}
      ORDER BY practices.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return practices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Faild to fetch practices table');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<ClientsTableType[]>`
		SELECT
		  clients.id,
		  clients.name,
		  clients.email,
      clients.phone,
      clients.type,
      COUNT(practices.id) AS total_practices,
		  SUM(CASE WHEN practices.status = 'open' THEN practices.price ELSE 0 END) AS total_open,
		  SUM(CASE WHEN practices.status = 'in_progress' THEN practices.price ELSE 0 END) AS total_in_progress,
		  SUM(CASE WHEN practices.status = 'closed' THEN practices.price ELSE 0 END) AS total_closed
		FROM clients
		LEFT JOIN practices ON clients.id = practices.client_id
		WHERE
		  clients.name ILIKE ${`%${query}%`} OR
      clients.email ILIKE ${`%${query}%`}
		GROUP BY clients.id, clients.name, clients.email, clients.phone, clients.type
		ORDER BY clients.name ASC
	  `;

    const clients = data.map((client) => ({
      ...client,
      total_open: formatCurrency(client.total_open),
      total_in_progress: formatCurrency(client.total_in_progress),
      total_closed: formatCurrency(client.total_closed),
      total_practices: client.total_practices
    }));

    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchClients() {
  try {
    const clients = await sql<Client[]>`
      SELECT
        id
        name
        email
        image_url
      FROM clients
      ORDER BY name ASC
    `;
    
    return clients;
  } catch (error) {
    console.error('Database Error: ' + error);
    throw new Error('Failed to fetch all customers');
  }
}