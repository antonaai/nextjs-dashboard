import bcrypt from "bcryptjs"
import postgres from 'postgres';
import { users, clients, practices, appointments, payments, tags, client_tags, practice_tags } from '../lib/placeholder-data';

const sql = postgres(process.env.LEXLY_SUPABASE_POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'staff',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password_hash ?? '123456', 10);
      return sql`
        INSERT INTO users (id, name, email, password_hash, role, created_at)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.created_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }),
  );

  return insertedUsers;
}

export async function seedClients() {
  await sql`
    CREATE TABLE IF NOT EXISTS clients (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      notes TEXT,
      vat_number TEXT,
      fiscal_code TEXT,
      address TEXT,
      zip_code TEXT,
      city TEXT,
      province TEXT,
      country TEXT DEFAULT 'Italia',
      sdi_code TEXT,
      pec_email TEXT,
      contact_person TEXT,
      type TEXT DEFAULT 'individual',
      created_by UUID REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      CONSTRAINT clients_type_check CHECK (type IN ('individual', 'company'))
    );
  `;

  const insertedClients = await Promise.all(
    clients.map((client) =>
      sql`
        INSERT INTO clients (
          id, name, email, phone, notes,
          vat_number, fiscal_code, address, zip_code, city, province, country,
          sdi_code, pec_email, contact_person, type,
          created_by, created_at
        )
        VALUES (
          ${client.id}, ${client.name}, ${client.email}, ${client.phone}, ${client.notes},
          ${client.vat_number}, ${client.fiscal_code}, ${client.address}, ${client.zip_code}, ${client.city}, ${client.province}, ${client.country},
          ${client.sdi_code}, ${client.pec_email}, ${client.contact_person}, ${client.type},
          ${client.created_by}, ${client.created_at}
        )
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedClients;
}

export async function seedPractices() {
  await sql`
    CREATE TABLE IF NOT EXISTS practices (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      practice_code TEXT UNIQUE,
      name TEXT NOT NULL,
      description TEXT,
      client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
      price NUMERIC,
      duration_min INTEGER,
      status TEXT DEFAULT 'open',
      type TEXT DEFAULT 'civil',
      opening_date DATE,
      closing_date DATE,
      assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
      priority TEXT DEFAULT 'medium',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      CONSTRAINT practices_status_check CHECK (status IN ('open', 'in_progress', 'closed', 'archived')),
      CONSTRAINT practices_type_check CHECK (type IN ('civil', 'criminal', 'labor', 'tax', 'corporate', 'family', 'other')),
      CONSTRAINT practices_priority_check CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
    );
  `;

  const insertedPractices = await Promise.all(
    practices.map((practice) =>
      sql`
        INSERT INTO practices (
          id, practice_code, name, description, client_id,
          price, duration_min, status, type, opening_date,
          closing_date, assigned_to, priority, created_at
        )
        VALUES (
          ${practice.id}, ${practice.practice_code}, ${practice.name}, ${practice.description}, ${practice.client_id},
          ${practice.price}, ${practice.duration_min}, ${practice.status}, ${practice.type}, ${practice.opening_date},
          ${practice.closing_date}, ${practice.assigned_to}, ${practice.priority}, ${practice.created_at}
        )
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedPractices;
}

export async function seedAppointments() {
  await sql`
    CREATE TABLE IF NOT EXISTS appointments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      practice_id UUID REFERENCES practices(id) ON DELETE SET NULL,
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      start_time TIMESTAMP WITH TIME ZONE NOT NULL,
      end_time TIMESTAMP WITH TIME ZONE,
      status TEXT DEFAULT 'confirmed',
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );
  `;

  const insertedAppointments = await Promise.all(
    appointments.map((appt) =>
      sql`
        INSERT INTO appointments (id, client_id, practice_id, user_id, start_time, end_time, status, notes, created_at)
        VALUES (
          ${appt.id},
          ${appt.client_id},
          ${appt.practice_id},
          ${appt.user_id},
          ${appt.start_time},
          ${appt.end_time},
          ${appt.status},
          ${appt.notes},
          ${appt.created_at}
        )
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedAppointments;
}

export async function seedPayments() {
  await sql`
    CREATE TABLE IF NOT EXISTS payments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
      appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
      amount NUMERIC NOT NULL,
      method TEXT,
      paid_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      notes TEXT
    );
  `;

  const insertedPayments = await Promise.all(
    payments.map((payment) =>
      sql`
        INSERT INTO payments (id, client_id, appointment_id, amount, method, paid_at, notes)
        VALUES (
          ${payment.id},
          ${payment.client_id},
          ${payment.appointment_id},
          ${payment.amount},
          ${payment.method},
          ${payment.paid_at},
          ${payment.notes}
        )
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedPayments;
}

export async function seedTags() {
  await sql`
    CREATE TABLE IF NOT EXISTS tags (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      type TEXT CHECK (type IN ('client', 'practice')) NOT NULL
    );
  `;

  const insertedTags = await Promise.all(
    tags.map((tag) =>
      sql`
        INSERT INTO tags (id, name, type)
        VALUES (${tag.id}, ${tag.name}, ${tag.type})
        ON CONFLICT (id) DO NOTHING
      `
    )
  );

  return insertedTags;
}

export async function seedClientTags() {
  await sql`
    CREATE TABLE IF NOT EXISTS client_tags (
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (client_id, tag_id)
    );
  `;

  const inserted = await Promise.all(
    client_tags.map((ct) =>
      sql`
        INSERT INTO client_tags (client_id, tag_id)
        VALUES (${ct.client_id}, ${ct.tag_id})
        ON CONFLICT DO NOTHING
      `
    )
  );

  return inserted;
}

export async function seedPracticeTags() {
  await sql`
    CREATE TABLE IF NOT EXISTS practice_tags (
      practice_id UUID REFERENCES practices(id) ON DELETE CASCADE,
      tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (practice_id, tag_id)
    );
  `;

  const inserted = await Promise.all(
    practice_tags.map((pt) =>
      sql`
        INSERT INTO practice_tags (practice_id, tag_id)
        VALUES (${pt.practice_id}, ${pt.tag_id})
        ON CONFLICT DO NOTHING
      `
    )
  );

  return inserted;
}

export async function GET() {
  try {
    await seedUsers();
    await seedClients();
    await seedPractices();
    await seedAppointments();
    await seedPayments();
    await seedTags();
    await seedClientTags();
    await seedPracticeTags();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

