import clsx from 'clsx';

export default function PracticePriority({ priority }: { priority: string}) {
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
                'bg-red-200': priority === 'urgent',
                'bg-orange-200': priority === 'high',
                'bg-yellow-200': priority === 'medium',
                'bg-blue-200': priority === 'low',
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