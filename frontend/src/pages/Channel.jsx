import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { channelService } from '../services/channel.service';
import { videoService } from '../services/video.service';
import { subscriptionService } from '../services/subscription.service';
import { VideoGrid } from '../components/video/VideoGrid';
import { Loader } from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import { Users, Video, PlaySquare } from 'lucide-react';

export const Channel = () => {
    const { username } = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('videos');

    useEffect(() => {
        if (username) {
            fetchChannelProfile();
        }
    }, [username]);

    const fetchChannelProfile = async () => {
        setLoading(true);
        try {
            const response = await channelService.getChannelProfile(username);
            const channelData = response.data;
            setChannel(channelData);
            setIsSubscribed(channelData.isSubscribed);
            setSubscribersCount(channelData.subscribersCount || 0);

            // After getting channel, fetch their videos
            fetchChannelVideos(channelData._id);
        } catch (error) {
            console.error('Failed to fetch channel profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannelVideos = async (userId) => {
        setVideoLoading(true);
        try {
            const response = await videoService.getAllVideos({ userId });
            setVideos(response.data.docs || []);
        } catch (error) {
            console.error('Failed to fetch channel videos:', error);
        } finally {
            setVideoLoading(false);
        }
    };

    const handleSubscribe = async () => {
        if (!user) {
            alert('Please login to subscribe');
            return;
        }
        try {
            const response = await subscriptionService.toggleSubscription(channel._id);
            setIsSubscribed(!isSubscribed);
            setSubscribersCount(prev => isSubscribed ? prev - 1 : prev + 1);
        } catch (error) {
            console.error('Failed to toggle subscription:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="lg" />
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-500">Channel not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            {/* Cover Image */}
            <div className="h-32 sm:h-48 md:h-64 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                {channel.coverImage ? (
                    <img
                        src={channel.coverImage}
                        alt="Channel Cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-900 opacity-20" />
                )}
            </div>

            {/* Channel Info Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                    {/* Avatar */}
                    <div className="relative group -mt-12 sm:-mt-16">
                        <img
                            src={channel.avatar}
                            alt={channel.username}
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-gray-950 shadow-lg object-cover bg-white"
                        />
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex-1 text-center sm:text-left pt-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                            {channel.fullName}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                            @{channel.username}
                        </p>

                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <strong>{subscribersCount}</strong> Subscribers
                            </span>
                            <span className="flex items-center gap-1">
                                <Video className="w-4 h-4" />
                                <strong>{videos.length}</strong> Videos
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
                            {user?._id === channel._id ? (
                                <Link
                                    to="/settings/profile"
                                    className="px-8 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
                                >
                                    Customize Channel
                                </Link>
                            ) : (
                                <button
                                    onClick={handleSubscribe}
                                    className={`px-8 py-2.5 rounded-full font-bold transition-all transform active:scale-95 ${isSubscribed
                                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
                                        }`}
                                >
                                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-800 mt-2 sticky top-16 bg-white dark:bg-gray-950 z-20">
                    <button
                        onClick={() => setActiveTab('videos')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'videos'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        VIDEOS
                    </button>
                    <button
                        onClick={() => setActiveTab('playlists')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'playlists'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        PLAYLISTS
                    </button>
                </div>

                {/* Content Area */}
                <div className="py-8">
                    {activeTab === 'videos' ? (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <PlaySquare className="w-5 h-5 text-primary-600" />
                                All Videos
                            </h2>
                            <VideoGrid videos={videos} loading={videoLoading} />
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500 italic">
                            Playlists are currently empty for this channel.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
