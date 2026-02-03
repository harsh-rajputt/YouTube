import api from './api';

export const likeService = {
    // Toggle video like
    toggleVideoLike: async (videoId) => {
        const response = await api.post(`/likes/toggle/v/${videoId}`);
        return response.data;
    },

    // Get all liked videos
    getLikedVideos: async () => {
        const response = await api.get('/likes/videos');
        return response.data;
    },

    // Toggle comment like
    toggleCommentLike: async (commentId) => {
        const response = await api.post(`/likes/toggle/c/${commentId}`);
        return response.data;
    },

    // Toggle tweet like
    toggleTweetLike: async (tweetId) => {
        const response = await api.post(`/likes/toggle/t/${tweetId}`);
        return response.data;
    },
};
