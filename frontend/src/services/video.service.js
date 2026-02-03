import api from './api';

export const videoService = {
    // Get all videos with filters
    getAllVideos: async (params = {}) => {
        const response = await api.get('/videos', { params });
        return response.data;
    },

    // Get video by ID
    getVideoById: async (videoId) => {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    },

    // Upload/publish video
    publishVideo: async (formData) => {
        const response = await api.post('/videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update video
    updateVideo: async (videoId, data) => {
        const response = await api.patch(`/videos/${videoId}`, data, {
            headers: {
                'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        });
        return response.data;
    },

    // Delete video
    deleteVideo: async (videoId) => {
        const response = await api.delete(`/videos/${videoId}`);
        return response.data;
    },

    // Toggle publish status
    togglePublishStatus: async (videoId) => {
        const response = await api.patch(`/videos/toggle/publish/${videoId}`);
        return response.data;
    },
};
