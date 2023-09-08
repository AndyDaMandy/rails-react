import React, {useEffect, useState} from "react";
import { deletePost as deletePostService, fetchAllPosts } from "../../services/postService.js";
import {Link} from "react-router-dom";

function PostsList(){
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    // fetch posts from the API

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
                setLoading(false);
            } catch (e) {
                setError("An error occurred");
                console.log("an error occurred: ", e);

            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            await deletePostService(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (e) {
            console.log("Failed to delete this post", e);
        }
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <Link to={`posts/${post.id}/edit`}>Edit Post</Link>
                    {" | "}
                    <Link to={`posts/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                    <div className="post-links">
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                </div>
                ))}
        </div>
    )
}

export default PostsList;