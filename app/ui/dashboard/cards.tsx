import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfPayments,
    numberOfClients,
    totalOpenPractices,
    totalInProgressPractices,
    totalClosedPractices
  } = await fetchCardData();

  return (
    <>
      <Card title="Tot. pratiche aperte" value={totalOpenPractices} type="collected" />
      <Card title="Tot. pratiche in corso" value={totalInProgressPractices} type="pending" />
      <Card title="Tot. pratiche chiuse" value={totalClosedPractices} type="pending" />      
      <Card title="Totale clienti" value={numberOfClients} type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-xl">
        {value}
      </p>
    </div>
  );
}
