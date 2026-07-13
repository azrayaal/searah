import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-hairline bg-sky-faint px-6 py-20 text-center">
      <SearchX className="mb-5 h-8 w-8 text-muted/60" aria-hidden />
      <h3 className="text-h3 text-navy-deep">{title}</h3>
      <p className="mt-2 max-w-md text-body-sm text-muted">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
