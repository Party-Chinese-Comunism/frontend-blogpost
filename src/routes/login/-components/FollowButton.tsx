import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


    //Olhar Codigo para verificaçao se esta logado ou nao, e persistecia de dados!.
interface FollowButtonProps {
    userId: number; 
    isInitiallyFollowing: boolean;
    onFollowToggle: (userId: number, isFollowing: boolean) => void;
  }
  
  const FollowButton: React.FC<FollowButtonProps> = ({ userId, isInitiallyFollowing, onFollowToggle }) => {
    const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  
    const handleClick = () => {
      const newIsFollowing = !isFollowing;
      setIsFollowing(newIsFollowing);
      onFollowToggle(userId, newIsFollowing); 
    };
  
    return (
      <Tooltip title={isFollowing ? 'Deixar de seguir' : 'Seguir'}>
        <IconButton onClick={handleClick}>
          {isFollowing ? (
            <BookmarkIcon color="primary" />
          ) : (
            <BookmarkBorderIcon color="primary" />
          )}
        </IconButton>
      </Tooltip>
    );
  };

export default FollowButton;