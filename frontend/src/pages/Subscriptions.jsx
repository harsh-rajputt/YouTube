import { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscription.service';
import { useAuth } from '../context/AuthContext';
import { Skeleton } from '../components/common/Skeleton';
import { Link } from 'react-router-dom';

export const Subscriptions = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchSubscriptions();
        }
    }, [user]);

    const fetchSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await subscriptionService.getSubscribedChannels(user._id);
            setChannels(response.data || []);
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 sm:p-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
                            <Skeleton className="w-20 h-20 rounded-full mb-3" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Subscriptions</h1>

            {channels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {channels.map((sub) => {
                        const channel = sub.subscribedChannel;
                        return (
                            <Link
                                key={channel._id}
                                to={`/channel/${channel.username}`}
                                className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow"
                            >
                                <img
                                    src={channel.avatar}
                                    alt={channel.username}
                                    className="w-20 h-20 rounded-full mb-3 object-cover shadow-sm"
                                />
                                <h3 className="font-bold text-center truncate w-full">{channel.fullName || channel.username}</h3>
                                <p className="text-xs text-gray-500">@{channel.username}</p>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">You haven't subscribed to any channels yet.</p>
                </div>
            )}
        </div>
    );
};
