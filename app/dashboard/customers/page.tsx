import Table from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
    title: "Clienti"
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query);

    return (
        <Suspense fallback={<CustomersTableSkeleton />}>
            <Table customers={customers} />
        </Suspense>
    )
}