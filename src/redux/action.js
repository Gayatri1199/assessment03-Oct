// action.js
export const FETCH_POSTS = "FETCH_POSTS";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const ADD_POST = "ADD_POST";

// Load users from local storage if available
const loadFromLocalStorage = () => {
  const storedPosts = localStorage.getItem("posts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

// Fetch users (from local storage or API)
export const fetchPosts = () => async (dispatch) => {
  const storedPosts = loadFromLocalStorage();

  if (storedPosts.length > 0) {
    dispatch({ type: FETCH_POSTS, payload: storedPosts });
  } else {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    localStorage.setItem("posts", JSON.stringify(data)); // Save to local storage
    dispatch({ type: FETCH_POSTS, payload: data });
  }
};

// Delete user
export const deletePost = (id) => (dispatch, getState) => {
  const { posts } = getState().posts;
  const newPosts = posts.filter((post) => post.id !== id);

  localStorage.setItem("posts", JSON.stringify(newPosts)); // Update local storage
  dispatch({ type: DELETE_POST, payload: id });
};

// Edit user
export const editPost = (updatedPost) => (dispatch, getState) => {
  const { posts } = getState().posts;
  const updatedPosts = posts.map((post) =>
    post.id === updatedPost.id ? updatedPost : post
  );

  localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update local storage
  dispatch({ type: EDIT_POST, payload: updatedPost });
};

// Add user
export const addPost = (newPost) => (dispatch, getState) => {
  const { posts } = getState().posts;
  const updatedPosts = [...posts, newPost];

  localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update local storage
  dispatch({ type: ADD_POST, payload: newPost });
};
