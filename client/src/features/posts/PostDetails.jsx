import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deletePost, fetchPost } from "../../services/postService.js";

function PostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const json = await fetchPost(id);
                setPost(json);
            } catch (e) {
                console.log("An error occurred", e);
            };
        };
        fetchCurrentPost();
    }, [id]);

    const deletePostHandler = async () => {
        try {
            await deletePost(post.id);
            navigate("/");
        } catch (e) {
            console.error("Failed to delete the post", e);
        }
    }
    //we return loading to prevent an error with the async if it hasn't found the post yet.

    if (!post) return <h2>Loading...</h2>;

    return (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
            {" | "}
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePostHandler}>Delete Post</button>
        </div>
    );
}

export default PostDetails;