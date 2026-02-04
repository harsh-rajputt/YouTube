import { Link, useNavigate } from 'react-router-dom';
import { Search, Upload, Menu, User, LogOut, Video } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onMenuClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
            setIsMobileSearchVisible(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-14 sm:h-16 glass z-50 px-2 sm:px-4">
            <div className="flex items-center justify-between h-full max-w-[100vw]">
                {/* Left: Menu + Logo */}
                <div className={`flex items-center gap-2 sm:gap-4 ${isMobileSearchVisible ? 'hidden md:flex' : 'flex'}`}>
                    <button
                        onClick={onMenuClick}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <Video className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
                        <span className="text-lg sm:text-xl font-bold hidden xs:block">VideoTube</span>
                    </Link>
                </div>

                {/* Center: Search */}
                <form
                    onSubmit={handleSearch}
                    className={`flex-1 max-w-2xl mx-2 sm:mx-4 ${isMobileSearchVisible ? 'flex' : 'hidden md:flex'}`}
                >
                    <div className="flex w-full">
                        {isMobileSearchVisible && (
                            <button
                                type="button"
                                onClick={() => setIsMobileSearchVisible(false)}
                                className="p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full md:hidden"
                            >
                                <Menu className="w-6 h-6 rotate-90" /> {/* Back arrow would be better if available */}
                            </button>
                        )}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search videos..."
                            className="flex-1 min-w-0 px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-l-full 
                  focus:outline-none focus:border-primary-500 bg-white dark:bg-gray-800 text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 
                  dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 shrink-0"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Right: Upload + User */}
                <div className={`items-center gap-1 sm:gap-2 ${isMobileSearchVisible ? 'hidden md:flex' : 'flex'}`}>
                    <button
                        onClick={() => setIsMobileSearchVisible(true)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full md:hidden"
                    >
                        <Search className="w-6 h-6" />
                    </button>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/upload"
                                className="flex items-center justify-center p-2 sm:px-4 sm:py-2 bg-primary-600 text-white rounded-lg 
                    hover:bg-primary-700 transition-colors"
                                title="Upload Video"
                            >
                                <Upload className="w-5 h-5" />
                                <span className="hidden sm:inline ml-2">Upload</span>
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                                >
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-500" />
                                        </div>
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
                            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-primary-600 text-primary-600 
                  rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors whitespace-nowrap"
                        >
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">Sign In</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
