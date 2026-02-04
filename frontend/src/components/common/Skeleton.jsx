export const Skeleton = ({ className }) => {
    return (
        <div className={`shimmer bg-gray-200 dark:bg-gray-800 rounded ${className}`} />
    );
};

export const VideoCardSkeleton = () => {
    return (
        <div className="space-y-3">
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="flex gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-3 w-[60%]" />
                </div>
            </div>
        </div>
    );
};
