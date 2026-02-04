import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { videoService } from '../services/video.service';
import { likeService } from '../services/like.service';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/common/Loader';
import { CommentSection } from '../components/video/CommentSection';
import { ThumbsUp, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const VideoDetail = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        fetchVideo();
    }, [id]);

    const fetchVideo = async () => {
        setLoading(true);
        try {
            const response = await videoService.getVideoById(id);
            const videoData = response.data;
            setVideo(videoData);

            // In a real app, the backend should return whether the current user liked it
            // and the total likes count. For now, we'll just check if it's in liked videos if logged in.
            if (user) {
                const likedRes = await likeService.getLikedVideos();
                const likedVideos = likedRes.data || [];
                setIsLiked(likedVideos.some(v => v._id === id));
            }
        } catch (error) {
            console.error('Failed to fetch video:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!user) {
            alert('Please login to like this video');
            return;
        }
        try {
            const response = await likeService.toggleVideoLike(id);
            setIsLiked(response.data.isLiked);
            // Updating local count is tricky since we don't have it initially
            // But for UI feedback we can just toggle it
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="lg" />
            </div>
        );
    }

    if (!video) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-500">Video not found</p>
            </div>
        );
    }

    const formatViews = (views) => {
        if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
        if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
        return views || 0;
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Video Section */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-lg overflow-hidden -mx-4 sm:mx-0">
                        <video
                            src={video.videoFile}
                            controls
                            className="w-full h-full"
                            autoPlay
                        />
                    </div>

                    {/* Video Info */}
                    <div className="space-y-2">
                        <h1 className="text-xl sm:text-2xl font-bold line-clamp-2">{video.title}</h1>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                {formatViews(video.views)} views • {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                            </div>

                            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                                <button
                                    onClick={handleLike}
                                    className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors whitespace-nowrap ${isLiked
                                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <ThumbsUp className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-current' : ''}`} />
                                    <span className="text-sm sm:text-base">{isLiked ? 'Liked' : 'Like'}</span>
                                </button>
                                <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
                                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm sm:text-base">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Channel Info */}
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Link to={`/channel/${video.owner?.username}`} className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity min-w-0">
                            {video.owner?.avatar && (
                                <img
                                    src={video.owner.avatar}
                                    alt={video.owner.username}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0"
                                />
                            )}
                            <div className="min-w-0">
                                <h3 className="font-semibold text-sm sm:text-base truncate">{video.owner?.fullName || video.owner?.username}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">@{video.owner?.username}</p>
                            </div>
                        </Link>
                        <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 text-sm sm:text-base whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>

                    {/* Description */}
                    <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="whitespace-pre-wrap text-xs sm:text-sm">{video.description}</p>
                    </div>

                    {/* Comments Section */}
                    <CommentSection videoId={id} />
                </div>

                {/* Sidebar - Related Videos */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Related Videos</h3>
                    <div className="text-gray-500 text-sm">
                        More videos from @{video.owner?.username} and other creators will appear here soon.
                    </div>
                </div>
            </div>
        </div>
    );
};

