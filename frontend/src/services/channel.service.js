import api from './api';

export const channelService = {
    // Get channel profile by username
    getChannelProfile: async (username) => {
        const response = await api.get(`/users/channel/${username}`);
        return response.data;
    },

    // Get channel videos (reusing video service or specific endpoint)
    getChannelVideos: async (username) => {
        // Since we don't have a specific 'get videos by username' endpoint yet, 
        // we might need to filter by owner in the backend or add an endpoint.
        // Actually, the dashboard uses getChannelVideos which is for the logged in user.
        // For public channel, we need another way.
        const response = await api.get('/videos', { params: { query: username } }); // fallback search
        return response.data;
    }
};
