import { CheckIcon, ClockIcon, DocumentIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PracticeStatus({ status }: { status: string}) {
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
                'bg-green-500 text-white': status === 'open',
                'bg-blue-300 text-white': status === 'in_progress',
                'bg-gray-100 text-gray-500': status === 'closed',
            },
        )}>
            {status === 'open' ? (
                <>
                  Aperta
                  <DocumentIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === 'in_progress' ? (
                <>
                  In corso
                  <ClockIcon className="ml-1 w-4 text-white" />
                </>
            ) : null}
            {status === 'closed' ? (
                <>
                  Chiusa
                  <CheckIcon className="ml-1 w-4" />
                </>
            ) : null}
        </span>
    )
}