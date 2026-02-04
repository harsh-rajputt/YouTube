import { useState, useEffect } from 'react';
import { likeService } from '../services/like.service';
import { VideoGrid } from '../components/video/VideoGrid';
import { ThumbsUp } from 'lucide-react';

export const LikedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLikedVideos();
    }, []);

    const fetchLikedVideos = async () => {
        setLoading(true);
        try {
            const response = await likeService.getLikedVideos();
            setVideos(response.data || []);
        } catch (error) {
            console.error('Failed to fetch liked videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
                <h1 className="text-xl sm:text-2xl font-bold">Liked Videos</h1>
            </div>
            <VideoGrid videos={videos} loading={loading} />
        </div>
    );
};
