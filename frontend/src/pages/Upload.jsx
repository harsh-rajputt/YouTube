import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { videoService } from '../services/video.service';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Upload as UploadIcon } from 'lucide-react';

export const Upload = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
    });
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setUploading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('videoFile', formData.videoFile);
            data.append('thumbnail', formData.thumbnail);

            await videoService.publishVideo(data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                    <UploadIcon className="w-8 h-8 text-primary-600" />
                    <h1 className="text-3xl font-bold">Upload Video</h1>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter video title"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Describe your video"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Video File (Required)
                        </label>
                        <input
                            type="file"
                            name="videoFile"
                            onChange={handleChange}
                            accept="video/*"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                bg-white dark:bg-gray-800"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Thumbnail (Required)
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                bg-white dark:bg-gray-800"
                        />
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={uploading}
                            className="flex-1"
                        >
                            {uploading ? 'Uploading...' : 'Publish Video'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
