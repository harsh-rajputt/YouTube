import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from '../common/Skeleton';

export const VideoGrid = ({ videos, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                    <VideoCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No videos found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {Array.isArray(videos) && videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
    );
};
