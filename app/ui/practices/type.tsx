export default function PracticeType({ type }: { type: string}) {
    return (
        <span
        className="inline-flex items-center px-2 py-1 text-xs">
            {type === 'tax' ? (
                <>
                  Tasse
                </>
            ) : null}
            {type === 'labor' ? (
                <>
                  Lavoro
                </>
            ) : null}
            {type === 'criminal' ? (
                <>
                  Penale
                </>
            ) : null}
            {type === 'family' ? (
                <>
                  Famiglia
                </>
            ) : null}
            {type === 'civil' ? (
                <>
                  Civile
                </>
            ) : null}
        </span>
    )
}