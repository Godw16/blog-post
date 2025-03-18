import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/slices/postSlice';
import { setAlert } from '../redux/slices/alertSlice';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';
import Alert from '../components/common/Alert';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: ''
  });
  const { title, content, image, tags } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.posts);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      dispatch(setAlert({ message: 'Please add a title and content', type: 'error' }));
      return;
    }
    
    dispatch(createPost(formData));
    dispatch(setAlert({ message: 'Post created successfully', type: 'success' }));
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#222831', fontWeight: 700 }}>
          Create New Post
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#393E46' }}>
          Share your thoughts, ideas, and insights with the community
        </Typography>
      </Box>

      <Alert />

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Post Title"
            name="title"
            value={title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="image"
            label="Image URL (optional)"
            name="image"
            value={image}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="tags"
            label="Tags (comma separated)"
            name="tags"
            value={tags}
            onChange={handleChange}
            placeholder="technology, programming, react"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Post Content"
            name="content"
            value={content}
            onChange={handleChange}
            multiline
            rows={10}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 2, color: '#393E46', borderColor: '#393E46' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ backgroundColor: '#00ADB5' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Publish Post'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;