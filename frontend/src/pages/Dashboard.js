import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { getPosts, deletePost } from '../redux/slices/postSlice';
import { setAlert } from '../redux/slices/alertSlice';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '../components/common/Alert';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
      dispatch(setAlert({ message: 'Post deleted successfully', type: 'success' }));
    }
  };

  // Filter posts by current user
  const userPosts = posts.filter(post => post.author._id === user?.id);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#222831', fontWeight: 700 }}>
          Dashboard
        </Typography>
        <Button
          component={RouterLink}
          to="/create-post"
          variant="contained"
          sx={{ backgroundColor: '#00ADB5' }}
        >
          Create New Post
        </Button>
      </Box>

      <Alert />

      <Paper sx={{ p: 2, mb: 4 }}>
        <Box sx={{ p: 2, bgcolor: '#EEEEEE', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#222831' }}>
            Welcome, {user ? user.username : 'User'}!
          </Typography>
          <Typography variant="body1" sx={{ color: '#393E46' }}>
            From your dashboard, you can manage all your blog posts.
          </Typography>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ mb: 2, color: '#222831', fontWeight: 600 }}>
        Your Posts
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#00ADB5' }} />
        </Box>
      ) : userPosts.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            You haven't created any posts yet.
          </Typography>
          <Button
            component={RouterLink}
            to="/create-post"
            variant="contained"
            sx={{ backgroundColor: '#00ADB5' }}
          >
            Create Your First Post
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#393E46' }}>
              <TableRow>
                <TableCell sx={{ color: '#EEEEEE', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: '#EEEEEE', fontWeight: 'bold' }}>Created At</TableCell>
                <TableCell sx={{ color: '#EEEEEE', fontWeight: 'bold' }}>Tags</TableCell>
                <TableCell sx={{ color: '#EEEEEE', fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <RouterLink to={`/post/${post._id}`} style={{ color: '#00ADB5', textDecoration: 'none' }}>
                      {post.title}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {post.tags && post.tags.map((tag, index) => (
                      <Chip 
                        key={index} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5, backgroundColor: '#EEEEEE' }} 
                      />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton component={RouterLink} to={`/edit-post/${post._id}`} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(post._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Dashboard;