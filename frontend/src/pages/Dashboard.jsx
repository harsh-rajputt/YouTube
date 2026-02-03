import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../services/dashboard.service';
import { videoService } from '../services/video.service';
import { Loader } from '../components/common/Loader';
import { Eye, Users, ThumbsUp, Video, Trash2, Edit } from 'lucide-react';

export const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, videosRes] = await Promise.all([
                dashboardService.getChannelStats(),
                dashboardService.getChannelVideos(),
            ]);
            setStats(statsRes.data);
            setVideos(videosRes.data || []);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (videoId) => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        try {
            await videoService.deleteVideo(videoId);
            setVideos(videos.filter((v) => v._id !== videoId));
        } catch (error) {
            console.error('Failed to delete video:', error);
        }
    };

    const handleTogglePublish = async (videoId) => {
        try {
            await videoService.togglePublishStatus(videoId);
            fetchDashboardData(); // Refresh data
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Channel Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                            <p className="text-2xl font-bold">{stats?.totalViews || 0}</p>
                        </div>
                        <Eye className="w-8 h-8 text-primary-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Subscribers</p>
                            <p className="text-2xl font-bold">{stats?.totalSubscribers || 0}</p>
                        </div>
                        <Users className="w-8 h-8 text-primary-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Videos</p>
                            <p className="text-2xl font-bold">{stats?.totalVideos || 0}</p>
                        </div>
                        <Video className="w-8 h-8 text-primary-600" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Likes</p>
                            <p className="text-2xl font-bold">{stats?.totalLikes || 0}</p>
                        </div>
                        <ThumbsUp className="w-8 h-8 text-primary-600" />
                    </div>
                </div>
            </div>

            {/* Videos Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Your Videos</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Video
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {Array.isArray(videos) && videos.map((video) => (
                                <tr key={video._id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={video.thumbnail}
                                                alt={video.title}
                                                className="w-24 h-14 object-cover rounded"
                                            />
                                            <div>
                                                <Link
                                                    to={`/video/${video._id}`}
                                                    className="font-medium hover:text-primary-600"
                                                >
                                                    {video.title}
                                                </Link>
                                                <p className="text-sm text-gray-500 line-clamp-1">{video.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${video.isPublished
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                                                }`}
                                        >
                                            {video.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{video.views}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleTogglePublish(video._id)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                                title={video.isPublished ? 'Unpublish' : 'Publish'}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(video._id)}
                                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded text-red-600"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {videos.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No videos uploaded yet</p>
                            <Link to="/upload" className="text-primary-600 hover:underline mt-2 inline-block">
                                Upload your first video
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
