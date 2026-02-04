import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { videoService } from '../services/video.service';
import { VideoGrid } from '../components/video/VideoGrid';

export const Home = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchVideos();
    }, [searchParams]);

    const fetchVideos = async () => {
        setLoading(true);
        try {
            const query = searchParams.get('search');
            const params = query ? { query } : {};
            const response = await videoService.getAllVideos(params);
            const videoData = response.data;
            if (videoData) {
                setVideos(videoData.docs || (Array.isArray(videoData) ? videoData : []));
            } else {
                setVideos([]);
            }
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                {searchParams.get('search') ? `Search results for "${searchParams.get('search')}"` : 'Home'}
            </h1>
            <VideoGrid videos={videos} loading={loading} />
        </div>
    );
};
