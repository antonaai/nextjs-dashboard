import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Impossibile trovare il cliente richiesto.</p>
      <Link
        href="/dashboard/customers"
        className="mt-4 rounded-md flex h-10 items-center bg-accent-primary-1 px-4 text-sm font-medium text-white transition-all duration-500 ease-in-out hover:bg-accent-primary-1 hover:text-white hover:border-white hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary-1"
      >
        Torna indietro
      </Link>
    </main>
  );
}