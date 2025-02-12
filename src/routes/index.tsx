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
import mockData from "../helpers/mock.json"; // Importando os dados mockados

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    console.log("Dados mockados carregados:", mockData);
    setData(mockData);
  }, []);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
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
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          padding: "20px",
          minHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        {data.map((item, index) => (
          <Grid item xs={12} sm={10} md={8} lg={6} key={index} sx={{ width: "100%" }}>
            <Card sx={{ width: "100%", maxWidth: "600px", borderRadius: "12px", boxShadow: 3, margin: "0 auto" }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={item.user?.profile_image || "https://picsum.photos/100"}
                    sx={{ bgcolor: red[500] }}
                    aria-label="user"
                  >
                    {item.user?.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                }
                title={truncateText(item.user?.name || "Usuário Desconhecido", 30)}
                subheader={truncateText(item.title || "Sem título", 50)}
              />
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  image={"/src/assets/ourlady.webp"}
                  alt={item.title || "Imagem"}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "500px",
                    minHeight: "350px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
                  <Typography variant="body1" fontWeight="bold">
                    {truncateText(item.user?.name, 25)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flexGrow: 1,
                    }}
                  >
                    {truncateText(item.description || "Nenhuma descrição disponível.", 50)}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", cursor: "pointer", mt: 1 }}
                  onClick={() => handleOpenComments(item)}
                >
                  {item.comments.length > 0 ? `Ver todos os ${item.comments.length} comentários` : "Sem comentários ainda"}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={handleFavoriteClick} aria-label="add to favorites">
                  <AnimatePresence mode="popLayout">
                    {isFavorite ? (
                      <motion.div
                        key="favorite"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <FavoriteIcon sx={{ color: "red" }} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="favoriteBorder"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <FavoriteBorderIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </IconButton>
                <IconButton onClick={() => handleOpenComments(item)} aria-label="ver comentários">
                  <CommentIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedPost && (
          <Box sx={{ display: "flex", flexDirection: "row", height: "600px" }}>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#000" }}>
              <img
                src={"/src/assets/ourlady.webp"}
                alt={selectedPost.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />

            </Box>

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <DialogTitle>Comentários</DialogTitle>
              <DialogContent sx={{ flex: 1, overflowY: "auto" }}>
                {selectedPost.comments.length > 0 ? (
                  <List>
                    {selectedPost.comments.map((comment, idx) => (
                      <ListItem
                        key={idx}
                        alignItems="flex-start"
                        secondaryAction={
                          <IconButton onClick={() => handleLikeComment(comment.id)}>
                            {likedComments[comment.id] ? (
                              <FavoriteIcon sx={{ color: "red" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={comment.user?.profile_image || "https://picsum.photos/100"} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={truncateText(comment.user?.name || "Anônimo", 25)}
                          secondary={truncateText(comment.content, 100)}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Sem comentários ainda.
                  </Typography>
                )}
              </DialogContent>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
