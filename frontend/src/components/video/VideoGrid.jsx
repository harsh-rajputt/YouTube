import { VideoCard } from './VideoCard';
import { Loader } from '../common/Loader';

export const VideoGrid = ({ videos, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader size="lg" />
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
