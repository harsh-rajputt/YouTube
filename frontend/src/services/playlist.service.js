import api from './api';

export const playlistService = {
    getUserPlaylists: async (userId) => {
        const response = await api.get(`/playlists/user/${userId}`);
        return response.data;
    },
    createPlaylist: async (data) => {
        const response = await api.post('/playlists', data);
        return response.data;
    },
    getPlaylistById: async (playlistId) => {
        const response = await api.get(`/playlists/${playlistId}`);
        return response.data;
    }
};
