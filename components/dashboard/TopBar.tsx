interface TopBarProps {
  title?: string;
  children?: React.ReactNode;
}

export function TopBar({ title, children }: TopBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6">
      {title && (
        <h1 className="text-2xl font-medium text-lyra-surface">{title}</h1>
      )}
      {children && <div className="flex items-center gap-3">{children}</div>}
    </header>
  );
}
