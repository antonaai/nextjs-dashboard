import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredPractices } from "@/app/lib/data";
import PracticeStatus from "@/app/ui/practices/status";
import PracticePriority from "@/app/ui/practices/priority";
import PracticeType from "@/app/ui/practices/type";

export default async function PracticesTable({
    query,
    currentPage
}: {
    query: string,
    currentPage: number
}) {
    const practices = await fetchFilteredPractices(query, currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                {practices?.map((practice) => (
                    <div
                    key={practice.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                    >
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                        <div className="mb-2 flex items-center">
                            <p>{practice.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{practice.practice_code}</p>
                        </div>
                        <PracticeStatus status={practice.status} />
                        <PracticeType type={practice.type} />
                        <PracticePriority priority={practice.priority} />
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                        <div>
                        <p className="text-xl font-medium">
                            {formatCurrency(practice.price)}
                        </p>
                        <p>{formatDateToLocal(practice.created_at)}</p>
                        </div>
                        {/* <div className="flex justify-end gap-2">
                        <UpdateInvoice id={practice.id} />
                        <DeleteInvoice id={practice.id} />
                        </div> */}
                    </div>
                    </div>
                ))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Pratica
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Codice pratica
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Prezzo
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Data
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Categoria
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Priorità
                    </th>
                    {/* <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Modifica</span>
                    </th> */}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {practices?.map((practice) => (
                    <tr
                        key={practice.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                            <p>{practice.name}</p>
                        </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {practice.practice_code}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {formatCurrency(practice.price)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            {formatDateToLocal(practice.created_at)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <PracticeStatus status={practice.status} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <PracticeType type={practice.type} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                            <PracticePriority priority={practice.priority} />
                        </td>
                        {/* <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                                <UpdateInvoice id={practice.id} />
                                <DeleteInvoice id={practice.id} />
                            </div>
                        </td> */}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};