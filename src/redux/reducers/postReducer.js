import {
  SET_POSTS,
  SET_POSTS_LOADING,
  RESET_POSTS,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  UPDATE_POST,
} from "../actions/postActions";

const initialState = {
  postsLoading: true,
  posts: [],
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      state = { ...state, posts: action.payload };
      return state;
    case SET_POSTS_LOADING:
      state = { ...state, postsLoading: action.payload };
      return state;
    case ADD_POST:
      state = { ...state, posts: [...state.posts, action.payload] };
      return state;
    case DELETE_POST:
      const filterPosts = state.posts.filter(
        (post) => post.postId !== action.payload
      );
      state = { ...state, posts: filterPosts };
      return state;
    case RESET_POSTS:
      state = initialState;
      return state;
    case ADD_COMMENT:
      state = {
        ...state,
        posts: state.posts.map((pst) =>
          pst.postId === action.payload.id
            ? pst.post.comments.push(action.payload.comment) && pst
            : pst
        ),
      };
      return state;
    case ADD_REPLY:
      const currentPost = state.posts.find(
        (pst) => pst.postId === action.payload.postId
      );
      currentPost.post.comments = action.payload.updatedComments;

      state = {
        ...state,
        posts: state.posts.map((pst) =>
          pst.postId === action.payload.postId ? currentPost : pst
        ),
      };
      return state;
    case DELETE_COMMENT:
      const Post = state.posts.find(
        (pst) => pst.postId === action.payload.postId
      );
      Post.post.comments = action.payload.filteredComments;
      state = {
        ...state,
        posts: state.posts.map((pst) =>
          pst.postId === action.payload.postId ? Post : pst
        ),
      };
      return state;
    case UPDATE_POST:
      const current = state.posts.find(
        (pst) => pst.postId === action.payload.postId
      );
      current.post.title = action.payload.data.title;
      current.post.category = action.payload.data.category;
      current.post.description = action.payload.data.description;
      state = {
        ...state,
        posts: state.posts.map((pst) =>
          pst.postId === action.payload.postId ? current : pst
        ),
      };
      return state;
    default:
      return state;
  }
}
