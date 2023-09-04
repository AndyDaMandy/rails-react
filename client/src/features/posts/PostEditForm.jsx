import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {API_URL} from "../../constants.js";

function PostEditForm() {
    //if I had a guess we'll need an async similar to the new post
    //the difference is that it will required headers and an input
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                }),
            });
            if (response.ok){
                const json = await response.json();
                console.log("Success", json);
                navigate(`/posts/${id}`);
            } else {
                throw response
            }
        } catch (e) {
            console.log("An error occurred", e);
        }
    }
    if (!post) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="post-title">Title</label>
                    <br />
                    <input
                        type="text"
                        id="post-title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </div>
                <div>
                    <lable htmllFor="post-body">Body</lable>
                    <br />
                    <textarea
                        id="post-body"
                        value={post.body}
                        onChange={(e) => setPost({...post, body: e.target.value})}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
            {" | "}
            <Link to={`posts/${id}`}>Back to Post Details</Link>
        </div>
    );
}

export default PostEditForm;