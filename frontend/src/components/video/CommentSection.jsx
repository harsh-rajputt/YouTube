import { useState, useEffect } from 'react';
import { commentService } from '../../services/comment.service';
import { likeService } from '../../services/like.service';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, ThumbsUp } from 'lucide-react';

export const CommentSection = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (videoId) {
            fetchComments();
        }
    }, [videoId]);

    const fetchComments = async () => {
        try {
            const response = await commentService.getVideoComments(videoId);
            setComments(response.data.docs || []);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await commentService.addComment(videoId, newComment);
            // Add the new comment to the list (with owner info if possible, or just refresh)
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleDelete = async (commentId) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            await commentService.deleteComment(commentId);
            setComments(comments.filter(c => c._id !== commentId));
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const handleToggleCommentLike = async (commentId) => {
        if (!user) {
            alert('Please login to like this comment');
            return;
        }
        try {
            await likeService.toggleCommentLike(commentId);
            // Refresh comments to get updated like status (in real app, update state locally)
            fetchComments();
        } catch (error) {
            console.error('Failed to toggle comment like:', error);
        }
    };

    if (loading) return <div className="text-center py-4">Loading comments...</div>;

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">{comments.length} Comments</h3>

            {user ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex gap-4">
                        <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-primary-500 outline-none py-2 resize-none"
                                rows={1}
                            />
                            <div className="flex justify-end mt-2">
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    className="bg-primary-600 text-white px-4 py-2 rounded-full font-medium disabled:bg-gray-400"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <p className="mb-8 text-gray-500 italic text-sm">Please log in to comment.</p>
            )}

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment._id} className="flex gap-4">
                        <img src={comment.owner?.avatar} alt={comment.owner?.username} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm">@{comment.owner?.username}</span>
                                <span className="text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>

                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    onClick={() => handleToggleCommentLike(comment._id)}
                                    className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 transition-colors"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-xs">Like</span>
                                </button>

                                {user?._id === comment.owner?._id && (
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="text-gray-500 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
