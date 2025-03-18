import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/slices/postSlice';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import PostCard from '../components/posts/PostCard';
import Alert from '../components/common/Alert';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
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
      ) : posts.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No posts found. Be the first to create a post!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;