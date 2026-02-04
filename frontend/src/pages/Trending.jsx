import { useState, useEffect } from 'react';
import { videoService } from '../services/video.service';
import { VideoGrid } from '../components/video/VideoGrid';
import { TrendingUp } from 'lucide-react';

export const Trending = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingVideos();
    }, []);

    const fetchTrendingVideos = async () => {
        setLoading(true);
        try {
            // Fetch videos sorted by views
            const response = await videoService.getAllVideos({ sortBy: 'views', sortType: 'desc' });
            setVideos(response.data.docs || []);
        } catch (error) {
            console.error('Failed to fetch trending videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
                <h1 className="text-xl sm:text-2xl font-bold">Trending Videos</h1>
            </div>
            <VideoGrid videos={videos} loading={loading} />
        </div>
    );
};
