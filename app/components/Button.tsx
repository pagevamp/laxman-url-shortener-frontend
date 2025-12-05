import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function Button({ children, onClick, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(
        `h-12 px-5 rounded-lg bg-blue-600 text-white font-medium
          shadow-md shadow-blue-600/30
          hover:bg-blue-700 active:scale-95
          transition-all duration-200 flex items-center justify-center cursor-pointer
          dark:bg-blue-500 dark:hover:bg-blue-600 dark:shadow-blue-500/30
        `,
        className
      )}
    >
      {children}
    </button>
  );
}
