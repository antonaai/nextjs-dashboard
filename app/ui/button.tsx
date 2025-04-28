import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-accent-primary-1 px-4 text-sm font-medium text-white transition-all duration-500 ease-in-out hover:bg-accent-primary-1 hover:text-white hover:border-white hover:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary-1',
        className,
      )}
    >
      {children}
    </button>
  );
}
