import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateClient() {
    return (
        <Link
            href="/dashboard/customers/create"
            className="flex h-10 items-center rounded-lg bg-white text-secondary-color-1 border-secondary-color-1 border px-4 text-sm font-medium transition-all duration-500 ease-in-out hover:bg-accent-primary-1 hover:text-white hover:border-white hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary-1"
        >
            <span className="hidden md:block">Aggiungi cliente</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateClient() {
    return (
        <Link
            href={`/dashboard/customers/${id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"        
        >
            <PencilIcon className="w-5" />
        </Link>
    )
}

// export function DeleteClient({ id }: { id: string }) {
//     const deleteClientWithId = deleteClient.bind(null, id);

//     return (
//         <form action={deleteClientWithId}>
//             <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//                 <span className="sr-only">
//                     Delete
//                 </span>
//                 <TrashIcon className="w-5" />
//             </button>
//         </form>
//     )
// }