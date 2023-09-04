import React, {useEffect, useState} from "react";
import { API_URL } from "../../constants.js";
import {Link} from "react-router-dom";

function PostsList(){
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);
    // fetch posts from the API

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch(API_URL);
                if (response.ok){
                    const json = await response.json();
                    setPosts(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError("An error occured");
                console.log("an error occured: ", e);

            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            } else {
                throw response;
            }
        } catch (e) {
            console.log(e);
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