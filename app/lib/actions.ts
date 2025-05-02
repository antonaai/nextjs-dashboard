'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';


const sql = postgres(process.env.LEXLY_SUPABASE_POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.'
    }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

const ClientFormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Per favore inserisci un nome valido.',
        required_error: 'Per favore inserisci un nome.',
    }),
    email: z.string({
        invalid_type_error: 'Per favore inserisci un indrizzo email valido.',
        required_error: 'Per favore inserisci un indirizzo email.',
    }),
    phone: z.string({
        invalid_type_error: 'Per favore inserisci un numero di telefono valido.',
        required_error: 'Per favore inserisci un numero di telefono.',
    }),
    notes: z.string().nullish(),
    vat_number: z.string().nullish(),
    fiscal_code: z.string().nullish(),
    address: z.string({
        invalid_type_error: 'Per favore inserisci un indirizzo valido.',
        required_error: 'Per favore inserisci un indirizzo.',
    }),
    zip_code: z.string({
        invalid_type_error: 'Per favore inserisci uno zip code valido.',
        required_error: 'Per favore inserisci uno zip code.',
    }),
    city: z.string({
        invalid_type_error: 'Per favore inserisci una città valida.',
        required_error: 'Per favore inserisci una città.',
    }),
    province: z.string({
        invalid_type_error: 'Per favore inserisci una provincia valida.',
        required_error: 'Per favore inserisci una provincia.',
    }),
    country: z.string({
        invalid_type_error: 'Per favore inserisci una nazione valida.',
        required_error: 'Per favore inserisci una nazione.',
    }),
    sdi_code: z.string().nullish(),
    pec_email: z.string().nullish(),
    contact_person: z.string().nullish(),
    type: z.enum(['individual', 'company'], {
        invalid_type_error: 'Per favore inserisci un tipo di cliente valido.',
    })
});

export type ClientState = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        notes?: string[];
        vat_number?: string[];
        fiscal_code?: string[];
        address?: string[];
        zip_code?: string[];
        city?: string[];
        province?: string[];
        country?: string[];
        sdi_code?: string[];
        pec_email?: string[];
        contact_person?: string[];
        type?: string[];
    };
    message?: string | null;
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    });

    if (!validatedFields.success) {
        console.log(validatedFields);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return {
            message: `Database Error - failed to Create Invoice with error: ${error}`
        }
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function createClient(prevState: ClientState | undefined, formData: FormData) {
    const validatedFields = ClientFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('name'),
        notes: formData.get('notes'),
        vat_number: formData.get('vat_number'),
        fiscal_code: formData.get('fiscal_code'),
        address: formData.get('address'),
        zip_code: formData.get('zip_code'),
        city: formData.get('city'),
        province: formData.get('province'),
        country: formData.get('country'),
        sdi_code: formData.get('sdi_code'),
        pec_email: formData.get('pec_email'),
        contact_person: formData.get('contact_person'),
        type: formData.get('type'),
    });

    if (!validatedFields.success) {
        console.log(validatedFields);

        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Campi mancanti. Non sono riuscito ad aggiungere il cliente richiesto.',
        };
    }

    const { 
        name,
        email,
        phone,
        notes,
        vat_number,
        fiscal_code,
        address,
        zip_code,
        city,
        province,
        country,
        sdi_code,
        pec_email,
        contact_person,
        type,
    } = validatedFields.data;

    const created_at = new Date().toISOString().split('T')[0];

    try {
        const session = await auth();

        if (!session?.user || !session?.user.email) {
            redirect('/login');
        }

        const created_by = session.user.id;

        if (!created_by) {
            throw new Error('No user id found');
        }

        await sql`
        INSERT INTO clients (name, email, phone, notes, vat_number, fiscal_code, address, zip_code, city, province, country, sdi_code, pec_email, contact_person, type, created_at, created_by)
        VALUES (${name}, ${email}, ${phone}, ${notes ?? null}, ${vat_number ?? null}, ${fiscal_code ?? null}, ${address}, ${zip_code}, ${city}, ${province}, ${country}, ${sdi_code ?? null}, ${pec_email ?? null}, ${contact_person ?? null}, ${type}, ${created_at}, ${created_by ?? null})
        `;
    } catch (error) {
        return {
            message: `Database Error - failed to Create Client - ${error}`
        }
    }

    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
            `;
    } catch (error) {
        console.log(error);
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

export async function deleteClient(id: string) {
    await sql`DELETE FROM clients WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            return 'Invalid credentials.';
        }
        throw error;
    }
}