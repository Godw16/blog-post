// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../redux/slices/postSlice';
// import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
// import PostCard from '../components/posts/PostCard';
// import Alert from '../components/common/Alert';

// const Home = () => {
//   const dispatch = useDispatch();
//   const { posts = [], loading, error } = useSelector((state) => state.posts);

//   useEffect(() => {
//     // Dispatch the getPosts action
//     dispatch(getPosts())
//       .unwrap() // Properly unwrap the result
//       .then(response => console.log('Posts response:', response))
//       .catch(error => console.error('Error fetching posts:', error));
//   }, [dispatch]);

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#222831', fontWeight: 700 }}>
//           Latest Blog Posts
//         </Typography>
//         <Typography variant="body1" color="text.secondary" sx={{ color: '#393E46' }}>
//           Discover insights, tips, and stories from the Exponential community
//         </Typography>
//       </Box>

//       <Alert />

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress sx={{ color: '#00ADB5' }} />
//         </Box>
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : Array.isArray(posts) && posts.length === 0 ? (
//         <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
//           No posts found. Be the first to create a post!
//         </Typography>
//       ) : Array.isArray(posts) ? (
//         <Grid container spacing={3}>
//           {posts.map((post) => (
//             <Grid item xs={12} sm={6} md={4} key={post._id}>
//               <PostCard post={post} />
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography color="error">
//           Invalid data format received for posts. Please check the console for details.
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/slices/postSlice';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import PostCard from '../components/posts/PostCard';
import Alert from '../components/common/Alert';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector((state) => state.posts);
  const [localPosts, setLocalPosts] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    // Check if we're in development mode
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      // For development: Use direct fetch with CORS proxy
      setLocalLoading(true);
      const fetchPosts = async () => {
        try {
          // Use a CORS proxy like cors-anywhere or your own proxy
          const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
          const apiUrl = 'https://blog-post-z8g6.onrender.com/api/posts';
          
          const response = await axios.get(proxyUrl + apiUrl);
          console.log('Direct posts response:', response.data);
          setLocalPosts(response.data);
          setLocalLoading(false);
        } catch (error) {
          console.error('Error in direct fetch:', error);
          setLocalError('Failed to fetch posts. Please try again later.');
          setLocalLoading(false);
        }
      };
      
      fetchPosts();
    } else {
      // For production: Use normal Redux action
      dispatch(getPosts())
        .unwrap()
        .then(response => console.log('Posts response:', response))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [dispatch]);

  // Determine which posts to use
  const displayPosts = process.env.NODE_ENV === 'development' ? localPosts : posts;
  const displayLoading = process.env.NODE_ENV === 'development' ? localLoading : loading;
  const displayError = process.env.NODE_ENV === 'development' ? localError : error;

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

      {displayLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#00ADB5' }} />
        </Box>
      ) : displayError ? (
        <Typography color="error">{displayError}</Typography>
      ) : Array.isArray(displayPosts) && displayPosts.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No posts found. Be the first to create a post!
        </Typography>
      ) : Array.isArray(displayPosts) ? (
        <Grid container spacing={3}>
          {displayPosts.map((post) => (
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