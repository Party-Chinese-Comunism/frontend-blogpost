import { Avatar, Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useUserPosts } from "../hooks/usePosts/useGetUserPosts";
import { useUserById } from "../hooks/useUsers/useGetUserById";
import { useState, useEffect } from "react";
import { followUser } from "../service/user/user";

export const Route = createFileRoute("/user/$id")({
  component: UserProfileComponent,
});

export default function UserProfileComponent() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: userData, isLoading: userLoading, error: userError, refetch } = useUserById(id);
  const { data: postsData, isLoading: postsLoading, error: postsError } = useUserPosts(id);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsFollowing(userData.is_following);
    }
  }, [userData]);

  const handleFollow = async () => {
    try {
      if (id) {
        await followUser(id);
      }
      setIsFollowing(!isFollowing);
      refetch();
    } catch (error) {
      console.error("Erro ao seguir usuário", error);
    }
  };

  if (userLoading || postsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userError || postsError) {
    return (
      <Typography textAlign="center" color="error" mt={4}>
        Erro ao carregar os dados do usuário. Tente novamente mais tarde.
      </Typography>
    );
  }

  const user = {
    username: userData?.username || "Usuário desconhecido",
    fullName: userData?.username || "Usuário desconhecido",
    profileImage: userData?.user_image || "https://picsum.photos/100",
    stats: {
      posts: postsData?.length || 0,
      followers: userData?.followers_number || 0,
      following: userData?.following_number || 0,
    },
    posts: postsData?.map((post) => post.image_url) || [],
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "auto", padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
        <Avatar src={user.profileImage} sx={{ width: 100, height: 100, border: "2px solid white" }} />
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h6">{user.username}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
            <Typography><strong>{user.stats.posts}</strong> publicações</Typography>
            <Typography><strong>{user.stats.followers}</strong> seguidores</Typography>
            <Typography><strong>{user.stats.following}</strong> seguindo</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button 
            variant={isFollowing ? "outlined" : "contained"} 
            sx={{ textTransform: "none" }} 
            onClick={handleFollow}
          >
            {isFollowing ? "Seguindo" : "Seguir"}
          </Button>
          <Button variant="outlined" startIcon={<ChatIcon />}>Chat</Button>
        </Box>
      </Box>

      <Box sx={{ borderTop: "1px solid gray", mt: 3, pt: 2 }}>
        {user.posts.length > 0 ? (
          <Grid container spacing={1}>
            {user.posts.map((post, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Box
                  sx={{
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                    background: `url(${post}) center/cover no-repeat`,
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center" width="100%" mt={2}>
            Nenhuma postagem encontrada.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
