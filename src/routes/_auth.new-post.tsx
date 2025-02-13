import { createFileRoute } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useCreatePost } from "../hooks/usePosts/useCreatePost";
import { CreatePostInput } from "../types/posts";

export const Route = createFileRoute("/_auth/new-post")({
  component: NewPostPage,
});

function NewPostPage() {
  const {
    mutate: createPost,
    isPending: isLoading,
    isError,
    isSuccess,
    error,
  } = useCreatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>();

  const onSubmit: SubmitHandler<CreatePostInput> = (data) => {
    createPost(data, {
      onSuccess: () => {
        reset();
        alert("Post criado com sucesso!");
      },
      onError: (err) => {
        console.error(err);
        alert("Erro ao criar o post");
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Criar Post
          </Typography>

          {isError && (
            <Typography variant="body2" color="error">
              {String(error)}
            </Typography>
          )}
          {isSuccess && (
            <Typography variant="body2" color="primary">
              Post criado com sucesso!
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              label="Título"
              fullWidth
              margin="normal"
              {...register("title", { required: "Título é obrigatório" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              {...register("description")}
            />

            <TextField
              type="file"
              fullWidth
              margin="normal"
              inputProps={{ accept: "image/*" }}
              {...register("image")}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? "Enviando..." : "Criar Post"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
