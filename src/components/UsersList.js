import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPosts, deletePost, editPost, addPost } from "../redux/action";
import styled from "styled-components";
import Modal from "./Modal";

const UsersListStyle = styled.div`
  h1 {
    font-size: 26px;
    text-align: center;
  }
  .table-wrapper {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    max-width: 1440px;
    width: 95%;
    margin: 20px auto;

    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 4;
      background: #eeeeee;
    }

    table {
      width: 100%;

      th,
      td {
        padding: 20px 5px;
        font-size: 14px;
        text-align: left;
        white-space: nowrap;
      }
      th {
        background: #80808036;
        text-transform: Uppercase;
      }

      td {
        border-top: 1px solid #eeeeee;
        :first-child {
          border: none;
        }
      }
    }
  }
  .image-wrapper {
    display: inline-block;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 100px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name-sec {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  i {
    cursor: pointer;
  }
  .fa-trash {
    color: #f24467;
  }
  .fa-pen {
    color: #605be9;
  }
`;

const UsersList = ({ posts, fetchPosts, deletePost, editPost, addPost }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      deletePost(id);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPost = { ...currentPost };
    if (updatedPost.id) {
      editPost(updatedPost);
    } else {
      addPost(updatedPost);
    }
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  return (
    <UsersListStyle>
      <h1>Records</h1>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Edit Details</h3>
        <form onSubmit={handleUpdate}>
          <input
            name="name"
            value={currentPost ? currentPost.name : ""}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={currentPost ? currentPost.email : ""}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="phone"
            value={currentPost ? currentPost.phone : ""}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            name="city"
            value={currentPost ? currentPost.address.city : ""}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            name="zipcode"
            value={currentPost ? currentPost.address.zipcode : ""}
            onChange={handleChange}
            placeholder="Zipcode"
            required
          />

          <button type="submit">
            {currentPost && currentPost.id ? "Update" : "Add"}
          </button>
        </form>
      </Modal>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Zipcode</th>

              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <span className="name-sec">
                    <span className="image-wrapper">
                      <img src="../Avatar-image.jpg" alt="Avatar" />
                    </span>
                    <span>{post.name}</span>
                  </span>
                </td>
                <td>{post.email}</td>
                <td>{post.phone}</td>
                <td>{post.address.city}</td>
                <td>{post.address.zipcode}</td>

                <td>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDelete(post.id)}
                  ></i>
                </td>
                <td>
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => handleEdit(post)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UsersListStyle>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  editPost,
  addPost,
})(UsersList);
