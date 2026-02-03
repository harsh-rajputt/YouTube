import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, Menu, User, LogOut, Video } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onMenuClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Left: Menu + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full lg:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <Video className="w-8 h-8 text-primary-600" />
                            <span className="text-xl font-bold hidden sm:block">VideoTube</span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
                        <div className="flex">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search videos..."
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full 
                  focus:outline-none focus:border-primary-500 bg-white dark:bg-gray-800"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 
                  dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Right: Upload + User */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/upload"
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg 
                    hover:bg-primary-700 transition-colors"
                                >
                                    <Upload className="w-5 h-5" />
                                    <span className="hidden sm:inline">Upload</span>
                                </Link>

                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                    >
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={user.username}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-6 h-6" />
                                        )}
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                      border border-gray-200 dark:border-gray-700 py-2">
                                            <Link
                                                to={`/channel/${user?._id}`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Your Channel
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/settings/profile"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Settings
                                            </Link>
                                            <hr className="my-2 border-gray-200 dark:border-gray-700" />
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                          flex items-center gap-2 text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2 border-2 border-primary-600 text-primary-600 
                  rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span>Sign In</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
