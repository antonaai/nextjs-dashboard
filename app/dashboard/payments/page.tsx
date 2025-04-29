import { Metadata } from 'next';
import { playfairDisplay } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/payments/table';
import { Suspense } from 'react';
import { PaymentsTableSkeleton } from '@/app/ui/skeletons';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchPaymentsPages } from '@/app/lib/data';



export const metadata: Metadata = {
    title: 'Pagamenti',
};

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string,
        page?: number,
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPaymentsPages(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${playfairDisplay.className} text-2xl`}>Pagamenti</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Cerca pagamento..." />
                {/* <CreatePayment /> */}
            </div>
            <Suspense key={query + currentPage} fallback={<PaymentsTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};