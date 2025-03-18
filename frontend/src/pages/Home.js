import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/slices/postSlice';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import PostCard from '../components/posts/PostCard';
import Alert from '../components/common/Alert';

const Home = () => {
  const dispatch = useDispatch();
  // Use default empty array if posts is undefined
  const { posts = [], loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts())
      .then(response => console.log('Posts response:', response))
      .catch(error => console.error('Error fetching posts:', error));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#222831', fontWeight: 700 }}>
          Latest Blog Posts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ color: '#393E46' }}>
          Discover insights, tips, and stories from the Exponential community
        </Typography>
      </Box>

      <Alert />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#00ADB5' }} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : Array.isArray(posts) && posts.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No posts found. Be the first to create a post!
        </Typography>
      ) : Array.isArray(posts) ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="error">
          Invalid data format received for posts. Please check the console for details.
        </Typography>
      )}
    </Container>
  );
};

export default Home;