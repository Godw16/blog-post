// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   posts: [],
//   post: null,
//   loading: false,
//   error: null
// };

// // Define base URL for your API
// // Change this to your actual API URL
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://blog-post-z8g6.onrender.com';

// // Get all posts
// export const getPosts = createAsyncThunk(
//   'posts/getPosts',
//   async (_, { rejectWithValue }) => {
//     try {
//       // Use the full URL path to your API
//       const res = await axios.get(`${API_BASE_URL}/api/posts`);
//       console.log('API response data:', res.data);
//       return res.data;
//     } catch (err) {
//       console.error('API error:', err);
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch posts'
//       );
//     }
//   }
// );

// // Get post by ID
// export const getPostById = createAsyncThunk(
//   'posts/getPostById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to fetch post'
//       );
//     }
//   }
// );

// // Create post
// export const createPost = createAsyncThunk(
//   'posts/createPost',
//   async (postData, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': token
//         }
//       };
//       const res = await axios.post(`${API_BASE_URL}/api/posts`, postData, config);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to create post'
//       );
//     }
//   }
// );

// // Update post
// export const updatePost = createAsyncThunk(
//   'posts/updatePost',
//   async ({ id, postData }, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-auth-token': token
//         }
//       };
//       const res = await axios.put(`${API_BASE_URL}/api/posts/${id}`, postData, config);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to update post'
//       );
//     }
//   }
// );

// // Delete post
// export const deletePost = createAsyncThunk(
//   'posts/deletePost',
//   async (id, { getState, rejectWithValue }) => {
//     try {
//       const { token } = getState().auth;
//       const config = {
//         headers: {
//           'x-auth-token': token
//         }
//       };
//       await axios.delete(`${API_BASE_URL}/api/posts/${id}`, config);
//       return id;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || 'Failed to delete post'
//       );
//     }
//   }
// );

// const postSlice = createSlice({
//   name: 'posts',
//   initialState,
//   reducers: {
//     clearPost: (state) => {
//       state.post = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Get all posts
//       .addCase(getPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         try {
//           // Handle different response formats
//           if (Array.isArray(action.payload)) {
//             // If API returns array directly
//             state.posts = action.payload;
//           } else if (action.payload && typeof action.payload === 'object' && action.payload.posts) {
//             // If API returns object with posts property
//             state.posts = action.payload.posts;
//           } else {
//             // Fallback to empty array if unexpected format
//             console.error('Unexpected API response format:', action.payload);
//             state.posts = [];
//             state.error = 'Invalid data format received';
//           }
//         } catch (err) {
//           console.error('Error processing response:', err);
//           state.posts = [];
//           state.error = 'Error processing data';
//         }
//       })
//       .addCase(getPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       })
//       // Get post by ID
//       .addCase(getPostById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getPostById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.post = action.payload;
//       })
//       .addCase(getPostById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       })
//       // Create post
//       .addCase(createPost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createPost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = [action.payload, ...state.posts];
//       })
//       .addCase(createPost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       })
//       // Update post
//       .addCase(updatePost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = state.posts.map(post => 
//           post._id === action.payload._id ? action.payload : post
//         );
//         state.post = action.payload;
//       })
//       .addCase(updatePost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       })
//       // Delete post
//       .addCase(deletePost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = state.posts.filter(post => post._id !== action.payload);
//       })
//       .addCase(deletePost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   }
// });

// export const { clearPost, clearError } = postSlice.actions;
// export default postSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null
};

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      // Use relative URL for the API - this will work with the proxy
      const res = await axios.get('/api/posts');
      console.log('API response data:', res.data);
      return res.data;
    } catch (err) {
      console.error('API error:', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch posts'
      );
    }
  }
);

// Get post by ID
export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch post'
      );
    }
  }
);

// Create post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.post('/api/posts', postData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create post'
      );
    }
  }
);

// Update post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      const res = await axios.put(`/api/posts/${id}`, postData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update post'
      );
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      await axios.delete(`/api/posts/${id}`, config);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete post'
      );
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPost: (state) => {
      state.post = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        try {
          // Handle different response formats
          if (Array.isArray(action.payload)) {
            // If API returns array directly
            state.posts = action.payload;
          } else if (action.payload && typeof action.payload === 'object' && action.payload.posts) {
            // If API returns object with posts property
            state.posts = action.payload.posts;
          } else {
            // Fallback to empty array if unexpected format
            console.error('Unexpected API response format:', action.payload);
            state.posts = [];
            state.error = 'Invalid data format received';
          }
        } catch (err) {
          console.error('Error processing response:', err);
          state.posts = [];
          state.error = 'Error processing data';
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Get post by ID
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map(post => 
          post._id === action.payload._id ? action.payload : post
        );
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
});

export const { clearPost, clearError } = postSlice.actions;
export default postSlice.reducer;