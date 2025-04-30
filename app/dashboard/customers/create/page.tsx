import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {
    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Clienti', href: '/dashboard/customers' },
                    {
                        label: 'Aggiungi Cliente',
                        href: '/dashboard/customers/create',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    )
}