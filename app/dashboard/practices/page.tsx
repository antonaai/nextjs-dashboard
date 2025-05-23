import Table from '@/app/ui/practices/table';
import { Suspense } from 'react';
import { Metadata } from "next";
import { playfairDisplay } from '@/app/ui/fonts';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchPracticesPage } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { PracticesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
    title: "Pratiche"
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchPracticesPage(query);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${playfairDisplay.className} text-2xl`}>Pratiche</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Cerca pratiche..." />
                {/* <CreateInvoice /> */}
            </div>
            <Suspense key={query + currentPage} fallback={<PracticesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}