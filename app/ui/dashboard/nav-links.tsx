'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentCurrencyEuroIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Pagamenti',
    href: '/dashboard/payments',
    icon: DocumentCurrencyEuroIcon,
  },
  { name: 'Clienti', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Pratiche', href: '/dashboard/practices', icon: DocumentDuplicateIcon },
  { name: 'Appuntamenti', href: '/dashboard/appointments', icon: CalendarDaysIcon }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-accent-primary-1 hover:text-white focus:bg-accent-primary-1 focus:text-white md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-500 ease-in-out',
              {
                'active': pathname === link.href
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
