type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      className={`
        mx-auto w-full
        px-4 mobile:px-6 tablet:px-8
        max-w-360
        ${className}
      `}
    >
      {children}
    </div>
  );
}
