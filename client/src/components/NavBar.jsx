import { Link } from "react-router-dom";

//TODO needs to create post list link
//TODO needs to contain a link to create a new post
function NavBar() {

    return (
        <nav>
            <Link to="/">Posts List</Link>
            {" | "}
            <Link to="posts/new">Create New Post</Link>
        </nav>
    );
}

export default NavBar;