interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <header className={`mb-6 ${className ?? ""}`}>
      <h1 className="text-2xl text-gray-900">{title}</h1>
      {description && (
        <p className="text-xs lg:text-sm text-gray-600 mt-1">{description}</p>
      )}
    </header>
  );
}
