import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { playfairDisplay } from '@/app/ui/fonts';
import { fetchLatestPayments } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestPayments= await fetchLatestPayments();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${playfairDisplay.className} mb-4 text-xl md:text-2xl`}>
        Ultime fatture
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestPayments.map((payment, i) => {
            return (
              <div
                key={payment.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {payment.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {payment.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {payment.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Aggiornato ora</h3>
        </div>
      </div>
    </div>
  );
}
