import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const VideoCard = ({ video }) => {
    const formatViews = (views) => {
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
        return views;
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Link to={`/video/${video._id}`} className="group">
            <div className="space-y-2">
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/5 group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all duration-300">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {video.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-80 text-white text-xs rounded">
                            {formatDuration(video.duration)}
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="flex gap-3">
                    {/* Channel Avatar */}
                    {video.owner?.avatar && (
                        <Link to={`/channel/${video.owner.username}`} className="flex-shrink-0">
                            <img
                                src={video.owner.avatar}
                                alt={video.owner.username}
                                className="w-9 h-9 rounded-full hover:ring-2 hover:ring-primary-500 transition-all"
                            />
                        </Link>
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="font-semibold line-clamp-2 text-sm mb-1 group-hover:text-primary-600">
                            {video.title}
                        </h3>

                        {/* Channel Name */}
                        <Link
                            to={`/channel/${video.owner?.username}`}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {video.owner?.fullName || video.owner?.username}
                        </Link>

                        {/* Views & Date */}
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <span>{formatViews(video.views)} views</span>
                            <span>•</span>
                            <span>
                                {video.createdAt && formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
