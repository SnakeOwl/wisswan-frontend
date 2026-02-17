export const Skeleton = ({ className }: { className?: string }) => (
    <div
        className={`animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded ${className}`}
    />
);