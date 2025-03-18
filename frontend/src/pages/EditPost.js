import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost, clearPost } from '../redux/slices/postSlice';
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

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: ''
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostById(id));

    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      // Check if the current user is the author
      if (user && post.author && post.author._id !== user.id) {
        dispatch(setAlert({ message: 'Not authorized to edit this post', type: 'error' }));
        navigate('/dashboard');
        return;
      }

      setFormData({
        title: post.title || '',
        content: post.content || '',
        image: post.image || '',
        tags: post.tags ? post.tags.join(', ') : ''
      });
    }
  }, [post, navigate, user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      dispatch(setAlert({ message: 'Please add a title and content', type: 'error' }));
      return;
    }
    
    dispatch(updatePost({ id, postData: formData }));
    dispatch(setAlert({ message: 'Post updated successfully', type: 'success' }));
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#00ADB5' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#222831', fontWeight: 700 }}>
          Edit Post
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#393E46' }}>
          Update your post details
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
            value={formData.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
             margin="normal"
             fullWidth
             id="image"
             label="Image URL (optional)"
             name="image"
             value={formData.image}
             onChange={handleChange}
             sx={{ mb: 2 }}
           />
           <TextField
             margin="normal"
             fullWidth
             id="tags"
             label="Tags (comma separated)"
             name="tags"
             value={formData.tags}
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
             value={formData.content}
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
               {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Post'}
             </Button>
           </Box>
         </Box>
       </Paper>
     </Container>
   );
 };
 
 export default EditPost;