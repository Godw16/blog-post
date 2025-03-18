import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  Chip,
  Button
} from '@mui/material';

const PostCard = ({ post }) => {
  // Format date in a readable way
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get first letter of username for Avatar
  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'A';
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 120) => {
    if (!content) return '';
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      {post.image && (
        <CardMedia
          component="img"
          height="140"
          image={post.image}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ 
          color: '#222831',
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {post.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#00ADB5', width: 24, height: 24, mr: 1 }}>
            {getInitial(post.author?.username)}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {post.author?.username || 'Anonymous'} • {formatDate(post.createdAt)}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{
          mb: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {truncateContent(post.content)}
        </Typography>
        
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {post.tags.slice(0, 3).map((tag, index) => (
              <Chip 
                key={index} 
                label={tag} 
                size="small"
                sx={{ 
                  backgroundColor: '#EEEEEE',
                  fontSize: '0.7rem',
                  height: 20
                }} 
              />
            ))}
            {post.tags.length > 3 && (
              <Typography variant="caption" sx={{ color: '#393E46', ml: 0.5 }}>
                +{post.tags.length - 3} more
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button 
          component={RouterLink} 
          to={`/post/${post._id}`}
          size="small" 
          sx={{ 
            color: '#00ADB5',
            '&:hover': {
              backgroundColor: 'rgba(0, 173, 181, 0.08)'
            }
          }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;