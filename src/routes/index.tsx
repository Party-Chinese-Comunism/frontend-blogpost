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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Ícone de fechar modal
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { useState } from "react";
import { useListAllPosts } from "../hooks/usePosts/useListAllPosts";
import { Post } from "../types/posts";
import { useCreateComment } from "../hooks/usePosts/useCreateComment";
import noImage from "../assets/no-image.png";
import { useFavoritePost } from "../hooks/usePosts/useFavoritePost";
import { useLikeComent } from "../hooks/usePosts/useLikeComent";
import { useListComments } from "../hooks/usePosts/useListComments";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { data = [], isLoading, isError } = useListAllPosts();
  const [newComment, setNewComment] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [open, setOpen] = useState(false);
  const createCommentMutation = useCreateComment();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const currentUsername = user?.user?.username || "Anônimo";
  const favoritePostMutation = useFavoritePost();

  // Hook para carregar os comentários dinamicamente ao abrir o modal
  const { data: comments = [], isLoading: isLoadingComments, refetch } = useListComments(selectedPost?.id || null);

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    createCommentMutation.mutate(
      { postId: selectedPost.id, content: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          refetch(); // Atualiza a lista de comentários após adicionar um novo
        },
        onError: (error) => {
          console.error("Erro ao enviar comentário:", error);
        },
      }
    );
  };

  const handleFavoriteClick = (postId: number) => {
    favoritePostMutation.mutate(
      { postId },
      {
        onError: () => {
          console.error("Erro ao favoritar post");
        },
      }
    );
  };

  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const likeCommentMutation = useLikeComent();

  const handleLikeComment = (commentId: number) => {
    likeCommentMutation.mutate(
      { commentId },
      {
        onSuccess: () => {
          refetch(); // Atualiza os comentários após curtir
        },
      }
    );
  };

  const truncateText = (text = "", maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (isError) return <Typography>Erro ao carregar os posts.</Typography>;

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={2} sx={{ padding: "20px", minHeight: "100vh" }}>
        {data.map((item) => (
          <Grid item xs={12} sm={10} md={8} lg={6} key={item.id} sx={{ width: "100%" }}>
            <Card sx={{ width: "100%", maxWidth: "600px", borderRadius: "12px", boxShadow: 3, margin: "0 auto" }}>
              <CardHeader
                avatar={
                  <Avatar src={item?.author_image || "https://picsum.photos/100"} sx={{ bgcolor: red[500] }}>
                    {item?.author?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                }
                title={truncateText(item?.author || "Usuário Desconhecido", 30)}
                subheader={truncateText(item.title || "", 50)}
              />
              <CardMedia
                component="img"
                image={item.image_url || noImage}
                sx={{ width: "100%", height: "auto", maxHeight: "500px", minHeight: "350px", objectFit: "contain" }}
              />
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{ color: "gray", cursor: "pointer", mt: 1 }}
                  onClick={() => handleOpenComments(item)}
                >
                  {item.comments_number
                    ? `Ver todos os ${item.comments_number} comentários`
                    : "Sem comentários ainda"}
                </Typography>
              </CardContent>

              {/* Ícones de like e comentário lado a lado na esquerda */}
              <CardActions sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <IconButton onClick={() => handleFavoriteClick(item.id)}>
                  {item.favorited_by_user ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="body2">{item.favorite_number}</Typography>

                <IconButton onClick={() => handleOpenComments(item)}>
                  <CommentIcon />
                </IconButton>
                <Typography variant="body2">{item.comments_number}</Typography>
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
              position: "relative",
            }}
          >
            {/* Botão de fechar no canto superior direito */}
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
            >
              <CloseIcon />
            </IconButton>

            {/* Imagem do post */}
            <Box sx={{ flex: { xs: "none", md: "1 1 50%" }, display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
              <img src={selectedPost?.image_url || noImage} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }} />
            </Box>

            {/* Área de comentários */}
            <Box sx={{ flex: { xs: "none", md: "1 1 50%" }, display: "flex", flexDirection: "column", padding: 2 }}>
              <DialogTitle>Comentários</DialogTitle>
              <DialogContent sx={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
                {isLoadingComments ? <CircularProgress /> : comments.length > 0 ? (
                  <List>{comments.map((comment) => (
                    <ListItem key={comment.id}>
                      <ListItemAvatar><Avatar src={comment.user_image || "https://picsum.photos/100"} /></ListItemAvatar>
                      <ListItemText primary={comment.username || "Anônimo"} secondary={comment.content} />
                    </ListItem>
                  ))}</List>
                ) : <Typography>Sem comentários ainda.</Typography>}
              </DialogContent>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
