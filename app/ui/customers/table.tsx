import { playfairDisplay } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import {
  FormattedClientsTable,
} from '@/app/lib/definitions';
import { CreateClient, UpdateClient, DeleteClient } from '@/app/ui/customers/buttons';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedClientsTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${playfairDisplay.className} mb-8 text-xl md:text-2xl`}>
        Clienti
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cerca clienti..." />
        <CreateClient />
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Tot. Aperte</p>
                        <p className="font-medium">{customer.total_open}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Tot. in Corso</p>
                        <p className="font-medium">{customer.total_in_progress}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_closed} Tot. Chiuse</p>
                    </div>

                    <div className="flex justify-end gap-2">
                      <UpdateClient id={customer.id} />
                      <DeleteClient id={customer.id} />
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Nome
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      N. Pratiche
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Tot. Aperte
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Tot. In Corso
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Tot. Chiuse
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm sm:pl-6">
                        <p>{customer.name}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_practices}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_open}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_in_progress}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.total_closed}
                      </td>
                      <td className="whitespace-nowrap bg-white py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateClient id={customer.id} />
                          <DeleteClient id={customer.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
