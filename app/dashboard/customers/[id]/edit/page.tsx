import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchClientById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const client = await fetchClientById(id);

    if (!client) {
        notFound();
    }

    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Fatture', href: '/dashboard/invoices' },
            {
                label: 'Modifica fattura',
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form client={client} />
        </main>
    );
}