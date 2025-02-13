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
  TextField,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import { useListAllPosts } from "../hooks/usePosts/useListAllPosts";
import { ListMyPostsResponse, Post } from "../types/posts";
import { useCreateComment } from "../hooks/usePosts/useCreateComment";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data = [], isLoading, isError } = useListAllPosts();
  const [newComment, setNewComment] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const [likedComments, setLikedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const createCommentMutation = useCreateComment();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUsername = user?.user.username || null;

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;


    createCommentMutation.mutate(
      { postId: selectedPost.id, content: newComment },
      {
        onSuccess: () => {

          setSelectedPost((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              comments: [
                ...prev.comments,
                {
                  id: Date.now(), 
                  username: currentUsername, 
                  content: newComment,
                  user: { profile_image: "https://picsum.photos/100" }, 
                },
              ],
            };
          });

          setNewComment(""); 
        },
        onError: (error) => {
          console.error("Erro ao enviar comentário:", error);
        },
      }
    );
  };

  const handleFavoriteClick = (postId: number) => {
    setFavorites((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleOpenComments = (post: Post) => {
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

  const truncateText = (text = "", maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError) return <Typography>Erro ao carregar os posts.</Typography>;

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ padding: "20px", minHeight: "100vh", overflowY: "scroll" }}
      >
        {data.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            key={index}
            sx={{ width: "100%" }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "12px",
                boxShadow: 3,
                margin: "0 auto",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={item?.profile_image || "https://picsum.photos/100"}
                    sx={{ bgcolor: red[500] }}
                    aria-label="user"
                  >
                    {item?.author?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                }
                title={truncateText(item?.author || "Usuário Desconhecido", 30)}
                subheader={truncateText(item.title || "", 50)}
              />
              <CardMedia
                component="img"
                image="/src/assets/ourlady.webp"
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  minHeight: "350px",
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {truncateText(item?.author, 25)}
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
                    {truncateText(
                      item.description || "Nenhuma descrição disponível.",
                      50
                    )}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", cursor: "pointer", mt: 1 }}
                  onClick={() => handleOpenComments(item)}
                >
                  {item.comments?.length
                    ? `Ver todos os ${item.comments.length} comentários`
                    : "Sem comentários ainda"}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleFavoriteClick(item.id)}>
                  {favorites[item.id] ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, 
        height: "700px", 
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <img
          src="/src/assets/ourlady.webp"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          width: "2px",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          padding: 2,
          height: "100%",
        }}
      >
        <DialogTitle>Comentários</DialogTitle>
        <DialogContent
          sx={{
            flex: 1,
            overflowY: "auto", // Permite rolagem apenas na área de comentários
            scrollbarWidth: "none", // Esconde barra no Firefox
            "&::-webkit-scrollbar": {
              display: "none", // Esconde barra no Chrome/Safari
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingBottom: "80px", // Espaço para input não cobrir comentários
          }}
        >
          {selectedPost?.comments.length > 0 ? (
            <List sx={{ flexGrow: 1 }}>
              {selectedPost.comments.map((comment, idx) => {
                const isCurrentUserComment =
                  comment.username === currentUsername;
                return (
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          comment.user?.profile_image ||
                          "https://picsum.photos/100"
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        isCurrentUserComment ? "Você" : comment.username || "Anônimo"
                      }
                      secondary={comment.content}
                    />
                    <IconButton onClick={() => handleLikeComment(comment.id)}>
                      {likedComments[comment.id] ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mt: 2, flexGrow: 1 }}
            >
              Sem comentários ainda.
            </Typography>
          )}
        </DialogContent>

        {/* Campo de input fixo dentro da área de rolagem */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            padding: "10px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Escreva um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleAddComment();
            }}
          >
            Comentar
          </Button>
        </Box>
      </Box>
    </Box>
  )}
</Dialog>




    </>
  );
}
