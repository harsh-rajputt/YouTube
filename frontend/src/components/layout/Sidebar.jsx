import { Link } from 'react-router-dom';
import { Home, TrendingUp, Users, Clock, ThumbsUp, ListVideo } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
    const { isAuthenticated } = useAuth();

    const menuItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: TrendingUp, label: 'Trending', path: '/trending' },
    ];

    const authMenuItems = [
        { icon: Users, label: 'Subscriptions', path: '/subscriptions' },
        { icon: Clock, label: 'History', path: '/history' },
        { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
        { icon: ListVideo, label: 'Playlists', path: '/playlists' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-14 sm:top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 
          dark:border-gray-800 z-40 transition-transform duration-300 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-2 sm:p-4 space-y-1 overflow-y-auto h-full">
                    {/* Main Menu */}
                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className="flex items-center gap-4 px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 
                  dark:hover:bg-gray-800 transition-colors"
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm sm:text-base">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Authenticated Menu */}
                    {isAuthenticated && (
                        <>
                            <hr className="my-2 sm:my-4 border-gray-200 dark:border-gray-700" />
                            <div className="space-y-1">
                                {authMenuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={onClose}
                                        className="flex items-center gap-4 px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 
                       dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
};
