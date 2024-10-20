import axios from 'axios';
import { useEffect, useState } from 'react';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/${productId}`);
                setComments(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch comments.');
                setLoading(false);
            }
        };

        fetchComments();
    }, [productId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/comments/${productId}`, { comment: newComment });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (err) {
            setError('Failed to post comment.');
        }
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.length === 0 ? (
                    <li>No comments yet.</li>
                ) : (
                    comments.map((comment) => (
                        <li key={comment._id}>
                            <p><strong>{comment.userEmail}</strong>: {comment.comment}</p>
                        </li>
                    ))
                )}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Comments;
