import { PlaySquare } from 'lucide-react';
import { Skeleton } from '../components/common/Skeleton';

export const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchPlaylists();
        }
    }, [user]);

    const fetchPlaylists = async () => {
        setLoading(true);
        try {
            const response = await playlistService.getUserPlaylists(user._id);
            setPlaylists(response.data || []);
        } catch (error) {
            console.error('Failed to fetch playlists:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-4 sm:p-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-video w-full rounded-xl" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Your Playlists</h1>

            {playlists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow group cursor-pointer"
                        >
                            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                                <PlaySquare className="w-10 h-10 text-gray-400 group-hover:text-primary-600 transition-colors" />
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                                    {playlist.videos?.length || 0} videos
                                </div>
                            </div>
                            <h3 className="font-bold truncate">{playlist.name}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{playlist.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No playlists found.</p>
                    <p className="text-sm text-gray-400 mt-1">Create your first playlist while watching a video!</p>
                </div>
            )}
        </div>
    );
};
