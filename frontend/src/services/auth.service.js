import api from './api';

export const authService = {
    // Register new user
    register: async (formData) => {
        const response = await api.post('/users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        if (response.data.data.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
        return response.data;
    },

    // Logout user
    logout: async () => {
        const response = await api.post('/users/logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        return response.data;
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await api.get('/users/current-user');
        return response.data;
    },

    // Update account details
    updateAccount: async (data) => {
        const response = await api.patch('/users/update-details', data);
        return response.data;
    },

    // Update avatar
    updateAvatar: async (formData) => {
        const response = await api.patch('/users/update-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update cover image
    updateCoverImage: async (formData) => {
        const response = await api.patch('/users/update-cover-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Change password
    changePassword: async (data) => {
        const response = await api.post('/users/change-password', data);
        return response.data;
    },
};
