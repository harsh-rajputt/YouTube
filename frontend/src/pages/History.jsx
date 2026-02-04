import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { VideoGrid } from '../components/video/VideoGrid';
import { Loader } from '../components/common/Loader';

export const History = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await authService.getWatchHistory();
            setVideos(response.data || []);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Watch History</h1>
            <VideoGrid videos={videos} loading={loading} />
            {!loading && videos.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">Your watch history is empty.</p>
                </div>
            )}
        </div>
    );
};
