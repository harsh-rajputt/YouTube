import api from './api';

export const subscriptionService = {
    // Toggle subscription
    toggleSubscription: async (channelId) => {
        const response = await api.post(`/subscriptions/c/${channelId}`);
        return response.data;
    },

    // Get subscribed channels
    getSubscribedChannels: async (subscriberId) => {
        const response = await api.get(`/subscriptions/u/${subscriberId}`);
        return response.data;
    },

    // Get my subscribed channels (current user)
    getMySubscribedChannels: async () => {
        const response = await api.get('/subscriptions/channels'); // Based on backend route if exists, or use getSubscribedChannels with my ID
        return response.data;
    }
};
