import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import "./index.css";

const initailPost = [
  {
    id: 1,
    caption: "Sunset at the beach",
    mediaUrl: "https://example.com/sunset.jpg",
  },
  {
    id: 2,
    caption: "Delicious food",
    mediaUrl: "https://example.com/food.jpg",
  },
  {
    id: 4,
    caption: "City skyline",
    mediaUrl: "https://example.com/city.jpg",
  },
  {
    id: 5,
    caption: "City skyline",
    mediaUrl: "https://example.com/city.jpg",
  },
  {
    id: 6,
    caption: "City skyline",
    mediaUrl: "https://example.com/city.jpg",
  },
  {
    id: 7,
    caption: "City skyline",
    mediaUrl: "https://example.com/city.jpg",
  },
  {
    id: 8,
    caption: "City skyline",
    mediaUrl: "https://example.com/city.jpg",
  },
];

const Posts = () => {
  const storedPosts = JSON.parse(localStorage.getItem("posts"));
  const [posts, setPosts] = useState(
    storedPosts !== null ? storedPosts : initailPost
  );
  const [newPost, setNewPost] = useState({ caption: "", mediaUrl: "" });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const totalPosts = posts.length;
  const postsPublishedLast24h = posts.filter(
    (post) => post.isPublishedRecently
  ).length;

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPostWithId = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      ...newPost,
    };
    setPosts([...posts, newPostWithId]);
    setNewPost({ caption: "", mediaUrl: "" }); 
  };

  return (
    <div className="homepage">
      <Navigation />
      <h1>Post Listing</h1>
      <div className="kpi-container">
        <div className="box"><h1>Total Posts: {totalPosts}</h1></div>
        <div className="box">
          <h1>Posts Published (Last 24h): {postsPublishedLast24h}</h1>
        </div>
      </div>

      <form onSubmit={handleAddPost}>
        <input
          type="text"
          placeholder="Caption"
          className="input-field"
          value={newPost.caption}
          onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Media URL"
          value={newPost.mediaUrl}
          className="input-field"
          onChange={(e) => setNewPost({ ...newPost, mediaUrl: e.target.value })}
          required
        />
        <button type="submit" className="add-post">
          Add Post
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Post Caption</th>
            <th>Media URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.caption}</td>
              <td>
                <a
                  href={post.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.mediaUrl}
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(post.id)} className="add-post">Delete</button>
                <button onClick={() => handleHide(post.id)} className="add-post">Hide</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );

  function handleDelete(postId) {
    console.log(`Deleted post with ID: ${postId}`);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  }

  function handleHide(postId) {
    console.log(`Hidden post with ID: ${postId}`);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  }
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <a onClick={() => paginate(number)} href="#!">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Posts;
