import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { Camera, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const ProfileSettings = () => {
    const { user, updateUser } = useAuth();
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
    const [coverPreview, setCoverPreview] = useState(user?.coverImage);
    const [loading, setLoading] = useState({ avatar: false, cover: false });
    const [message, setMessage] = useState({ type: '', text: '' });

    const avatarInputRef = useRef();
    const coverInputRef = useRef();

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'avatar') {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        } else {
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async (type) => {
        const file = type === 'avatar' ? avatarFile : coverFile;
        if (!file) return;

        setLoading(prev => ({ ...prev, [type]: true }));
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append(type === 'avatar' ? 'avatar' : 'coverImage', file);

        try {
            let response;
            if (type === 'avatar') {
                response = await authService.updateAvatar(formData);
            } else {
                response = await authService.updateCoverImage(formData);
            }

            const updatedUserData = response.data;
            updateUser(updatedUserData);

            setMessage({
                type: 'success',
                text: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`
            });

            if (type === 'avatar') setAvatarFile(null);
            else setCoverFile(null);

        } catch (error) {
            console.error(`Failed to update ${type}:`, error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || `Failed to update ${type}`
            });
        } finally {
            setLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Channel Customization</h1>

            {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                </div>
            )}

            <div className="space-y-12">
                {/* Cover Image Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">Banner Image</h2>
                            <p className="text-sm text-gray-500">This image will appear across the top of your channel.</p>
                        </div>
                        {coverFile && (
                            <button
                                onClick={() => handleUpload('cover')}
                                disabled={loading.cover}
                                className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading.cover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Publish
                            </button>
                        )}
                    </div>

                    <div className="relative h-48 sm:h-64 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden group">
                        {coverPreview ? (
                            <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No banner image set
                            </div>
                        )}
                        <button
                            onClick={() => coverInputRef.current.click()}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium"
                        >
                            <Camera className="w-6 h-6" />
                            Change Banner
                        </button>
                        <input
                            type="file"
                            ref={coverInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'cover')}
                        />
                    </div>
                </section>

                {/* Avatar Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">Profile Picture</h2>
                            <p className="text-sm text-gray-500">Your profile picture will appear where your channel is presented on YouTube.</p>
                        </div>
                        {avatarFile && (
                            <button
                                onClick={() => handleUpload('avatar')}
                                disabled={loading.avatar}
                                className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loading.avatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Publish
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-950 shadow-md"
                            />
                            <button
                                onClick={() => avatarInputRef.current.click()}
                                className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            >
                                <Camera className="w-6 h-6" />
                            </button>
                            <input
                                type="file"
                                ref={avatarInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'avatar')}
                            />
                        </div>
                        <div className="flex-1 max-w-md">
                            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                                <li>It's recommended to use a picture that's at least 98 x 98 pixels.</li>
                                <li>Use a PNG or GIF (no animations) file.</li>
                                <li>Make sure your picture follows our Community Guidelines.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
