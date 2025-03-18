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
      // Comment this out temporarily
      // const res = await axios.get('/api/posts');
      // console.log('API response data:', res.data);
      // return res.data;
      
      // Use mock data instead
      console.log('Using mock data while API is being fixed');
      return [
        {
          _id: '1',
          title: 'Sample Post 1',
          content: 'This is a sample post about React development',
          author: { name: 'John Doe' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/300',
          tags: ['react', 'javascript', 'frontend']
        },
        {
          _id: '2',
          title: 'Sample Post 2',
          content: 'This is another sample post about Redux state management',
          author: { name: 'Jane Smith' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/300',
          tags: ['redux', 'state management', 'react']
        },
        {
          _id: '3',
          title: 'Sample Post 3',
          content: 'Let\'s explore Material UI components in React applications',
          author: { name: 'Mike Johnson' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/300',
          tags: ['material-ui', 'components', 'design']
        }
      ];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error fetching posts');
    }
  }
);

// Get post by ID
export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, { rejectWithValue }) => {
    try {
      // Comment this out temporarily
      // const res = await axios.get(`/api/posts/${id}`);
      // return res.data;
      
      // Use mock data instead
      console.log('Using mock data for post by ID while API is being fixed');
      const mockPosts = [
        {
          _id: '1',
          title: 'Sample Post 1',
          content: 'This is a sample post about React development. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          author: { name: 'John Doe', _id: 'user1' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/800x400',
          tags: ['react', 'javascript', 'frontend'],
          comments: [
            { _id: 'c1', text: 'Great post!', author: { name: 'Commenter 1' }, date: new Date().toISOString() },
            { _id: 'c2', text: 'Thanks for sharing this info', author: { name: 'Commenter 2' }, date: new Date().toISOString() }
          ]
        },
        {
          _id: '2',
          title: 'Sample Post 2',
          content: 'This is another sample post about Redux state management. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          author: { name: 'Jane Smith', _id: 'user2' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/800x400',
          tags: ['redux', 'state management', 'react'],
          comments: [
            { _id: 'c3', text: 'This helped me a lot', author: { name: 'Commenter 3' }, date: new Date().toISOString() }
          ]
        },
        {
          _id: '3',
          title: 'Sample Post 3',
          content: 'Let\'s explore Material UI components in React applications. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
          author: { name: 'Mike Johnson', _id: 'user3' },
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/800x400',
          tags: ['material-ui', 'components', 'design'],
          comments: []
        }
      ];
      
      const post = mockPosts.find(post => post._id === id);
      
      if (post) {
        return post;
      } else {
        return rejectWithValue('Post not found');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error fetching post');
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
      // Comment this out temporarily
      // const res = await axios.post('/api/posts', postData, config);
      // return res.data;
      
      // Use mock data instead
      console.log('Using mock data for creating post while API is being fixed');
      // Create a new post with mock data
      const newPost = {
        _id: Date.now().toString(),
        ...postData,
        author: { name: 'Current User', _id: 'current-user' },
        date: new Date().toISOString(),
        comments: []
      };
      
      return newPost;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error creating post');
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
      // Comment this out temporarily
      // const res = await axios.put(`/api/posts/${id}`, postData, config);
      // return res.data;
      
      // Use mock data instead
      console.log('Using mock data for updating post while API is being fixed');
      // Update the post with mock data
      const updatedPost = {
        _id: id,
        ...postData,
        author: { name: 'Current User', _id: 'current-user' },
        date: new Date().toISOString()
      };
      
      return updatedPost;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error updating post');
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
      // Comment this out temporarily
      // await axios.delete(`/api/posts/${id}`, config);
      
      // Use mock data instead
      console.log('Using mock data for deleting post while API is being fixed');
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error deleting post');
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
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
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
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get post by ID
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
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
        state.error = action.payload;
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearPost, clearError } = postSlice.actions;
export default postSlice.reducer;