import api from './api';

export const dashboardService = {
    // Get channel stats
    getChannelStats: async () => {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    // Get channel videos
    getChannelVideos: async () => {
        const response = await api.get('/dashboard/videos');
        return response.data;
    },
};
