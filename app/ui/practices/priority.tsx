import clsx from 'clsx';

export default function PracticePriority({ priority }: { priority: string}) {
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
                'bg-red-400 text-white': priority === 'urgent',
                'bg-orange-400 text-white': priority === 'high',
                'bg-yellow-200 text-black': priority === 'medium',
                'bg-green-500 text-white': priority === 'low',
            },
        )}>
            {priority === 'urgent' ? (
                <>
                  Urgente
                </>
            ) : null}
            {priority === 'high' ? (
                <>
                  Alta
                </>
            ) : null}
            {priority === 'medium' ? (
                <>
                  Media
                </>
            ) : null}
            {priority === 'low' ? (
                <>
                  Bassa
                </>
            ) : null}
        </span>
    )
}