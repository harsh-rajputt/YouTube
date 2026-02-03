import { useState, useEffect } from 'react';
import { likeService } from '../services/like.service';
import { VideoGrid } from '../components/video/VideoGrid';

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
            const videoData = response.data;
            setVideos(videoData || []);
        } catch (error) {
            console.error('Failed to fetch liked videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>
            <VideoGrid videos={videos} loading={loading} />
        </div>
    );
};
