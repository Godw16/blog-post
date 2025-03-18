import React, { useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, deletePost } from '../redux/slices/postSlice';
import { setAlert } from '../redux/slices/alertSlice';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  Divider,
  Avatar,
  IconButton,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '../components/common/Alert';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading } = useSelector((state) => state.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
      dispatch(setAlert({ message: 'Post deleted successfully', type: 'success' }));
      navigate('/dashboard');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading || !post) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#00ADB5' }} />
      </Container>
    );
  }

  // Check if current user is the author
  const isAuthor = isAuthenticated && user && post.author && post.author._id === user.id;

  return (
    <Container maxWidth="md">
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, color: '#393E46' }}
      >
        Back to Posts
      </Button>

      <Alert />

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        {post.image && (
          <Box sx={{ 
            height: { xs: 200, sm: 300 }, 
            overflow: 'hidden', 
            borderRadius: 1, 
            mb: 3 
          }}>
            <img 
              src={post.image} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </Box>
        )}

        <Typography variant="h4" component="h1" sx={{ color: '#222831', fontWeight: 700 }}>
          {post.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Avatar sx={{ bgcolor: '#00ADB5', width: 32, height: 32, mr: 1 }}>
            {post.author?.username ? post.author.username.charAt(0).toUpperCase() : 'A'}
          </Avatar>
          <Box>
            <Typography variant="body2">
              {post.author?.username || 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.createdAt)}
            </Typography>
          </Box>
          
          {isAuthor && (
            <Box sx={{ ml: 'auto' }}>
              <IconButton 
                component={RouterLink} 
                to={`/edit-post/${post._id}`} 
                color="primary"
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={handleDelete} 
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {post.tags && post.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
            {post.tags.map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small" 
                sx={{ backgroundColor: '#EEEEEE' }} 
              />
            ))}
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#393E46', 
            lineHeight: 1.8,
            whiteSpace: 'pre-line' // Preserves line breaks in content
          }}
        >
          {post.content}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PostDetails;