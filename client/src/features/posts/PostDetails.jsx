import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {API_URL} from "../../constants.js";

function PostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                } else {
                    throw response;
                }
            } catch (e) {
                console.log("An error occurred", e);
            };
        };
        fetchCurrentPost();
    }, [id]);

    //we return loading to prevent an error with the async if it hasn't found the post yet.

    if (!post) return <h2>Loading...</h2>;

    return (
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to="/">Back to Posts</Link>
        </div>
    );
}

export default PostDetails;