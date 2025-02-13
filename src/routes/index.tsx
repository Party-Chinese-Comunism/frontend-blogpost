import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [data, setData] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/list`);
        setData(response.data.map(post => ({ ...post, comments: post.comments || [] })));
      } catch (error) {
        console.error("Erro ao buscar os posts:", error);
      }
    };
    fetchData();
  }, []);

  const handleFavoriteClick = (postId: number) => {
    setFavorites((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleOpenComments = (post: any) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handleLikeComment = (commentId: number) => {
    setLikedComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const truncateText = (text: string = "", maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2} sx={{ padding: "20px", minHeight: "100vh", overflowY: "scroll" }}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={10} md={8} lg={6} key={index} sx={{ width: "100%" }}>
            <Card sx={{ width: "100%", maxWidth: "600px", borderRadius: "12px", boxShadow: 3, margin: "0 auto" }}>
              <CardHeader
                avatar={<Avatar src={item.user?.profile_image || "https://picsum.photos/100"} sx={{ bgcolor: red[500] }} aria-label="user">{item.user?.name?.charAt(0).toUpperCase() || "U"}</Avatar>}
                title={truncateText(item?.author || "Usuário Desconhecido", 30)}
                subheader={truncateText(item.title || "Sem título", 50)}
              />
              <CardMedia component="img" image="/src/assets/ourlady.webp" alt={item.title || "Imagem"} sx={{ width: "100%", height: "auto", maxHeight: "500px", minHeight: "350px", objectFit: "contain" }} />
              <CardContent>
                <Typography variant="body2" sx={{ color: "gray", cursor: "pointer", mt: 1 }} onClick={() => handleOpenComments(item)}>
                  {item.comments?.length ? `Ver todos os ${item.comments.length} comentários` : "Sem comentários ainda"}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleFavoriteClick(item.id)}>
                  {favorites[item.id] ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={() => handleOpenComments(item)}>
                  <CommentIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        {selectedPost && (
          <Box sx={{ display: "flex", flexDirection: "row", height: "700px", padding: 2 }}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
              <img src="/src/assets/ourlady.webp" alt={selectedPost.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </Box>
            <Box sx={{ width: "2px", backgroundColor: "rgba(0, 0, 0, 0.2)" }} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: 2 }}>
              <DialogTitle>Comentários</DialogTitle>
              <DialogContent sx={{ flex: 1, overflowY: "auto", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "6px" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "6px" } }}>
                {selectedPost.comments.length > 0 ? (
                  <List>
                    {selectedPost.comments.map((comment, idx) => (
                      <ListItem key={idx}>
                        <ListItemAvatar>
                          <Avatar src={comment.user?.profile_image || "https://picsum.photos/100"} />
                        </ListItemAvatar>
                        <ListItemText primary={comment?.name || "Anônimo"} secondary={comment.content} />
                        <IconButton onClick={() => handleLikeComment(comment.id)}>
                          {likedComments[comment.id] ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>Sem comentários ainda.</Typography>
                )}
              </DialogContent>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
