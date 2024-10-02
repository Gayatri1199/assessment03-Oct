// reducer.js
import { combineReducers } from "redux";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return { ...state, posts: action.payload };

    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case "EDIT_POST":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;
