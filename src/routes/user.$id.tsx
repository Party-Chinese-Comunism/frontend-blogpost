import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useState } from "react";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$id")({
  component: UserProfileComponent,
});

const mockUser = {
  username: "luis__balsamo",
  fullName: "Luís Gustavo Balsamo",
  profileImage: "https://picsum.photos/100",
  posts: [
    "https://picsum.photos/300",
    "https://picsum.photos/300",
    "https://picsum.photos/300",
    "https://picsum.photos/300",
    "https://picsum.photos/300",
    "https://picsum.photos/300",
  ],
  stats: {
    posts: 18,
    followers: 416,
    following: 318,
  },
};

export default function UserProfileComponent() {
  const { id } = useParams({ strict: false }); // Obtém o ID do usuário na URL
  const [user] = useState(mockUser);

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", padding: 2 }}>
      {/* Cabeçalho do Perfil */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        {/* Avatar e Nome */}
        <Avatar
          src={user.profileImage}
          sx={{ width: 100, height: 100, border: "2px solid white" }}
        />
        {/* Estatísticas */}
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h6">{user.username}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
            <Typography>
              <strong>{user.stats.posts}</strong> publicações
            </Typography>
            <Typography>
              <strong>{user.stats.followers}</strong> seguidores
            </Typography>
            <Typography>
              <strong>{user.stats.following}</strong> seguindo
            </Typography>
          </Box>
        </Box>
        {/* Botões */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ textTransform: "none" }}
          >
            Editar perfil
          </Button>
          <Button variant="outlined" startIcon={<ArchiveIcon />}>
            Arquivados
          </Button>
        </Box>
      </Box>

      {/* Nome completo */}
      <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 2 }}>
        {user.fullName}
      </Typography>

      {/* Grade de Postagens */}
      <Box sx={{ borderTop: "1px solid gray", mt: 3, pt: 2 }}>
        <Grid container spacing={1}>
          {user.posts.map((post, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <Box
                sx={{
                  width: "100%",
                  paddingTop: "100%", // Mantém a proporção quadrada
                  position: "relative",
                  background: `url(${post}) center/cover no-repeat`,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
