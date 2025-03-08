import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/auth";
import { db } from "../../firebase";
import { useSearchUsersByName } from "../../hooks/useUsers/useSearchUsersByName";
import UserCard from "./-components/UserCard";

export const Route = createFileRoute("/_auth/chat/")({
  component: RouteComponent,
});

type FirebaseUser = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string; // Adicionamos a possibilidade de ter avatar
};

type ChatData = {
  id: string;
  participants: string[];
  otherUser?: FirebaseUser;
};

function RouteComponent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useAuth();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchUsersByName(search);
  const [firebaseUsers, setFirebaseUsers] = useState<FirebaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<ChatData[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as FirebaseUser
        );

        setFirebaseUsers(usersList);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      if (!auth.user?.email) return;

      try {
        const currentUser = firebaseUsers.find(
          (user) => user.email === auth.user?.email
        );

        if (!currentUser) return;
        const currentUserId = currentUser.id;

        console.log("🔍 Buscando chats para:", currentUserId);

        const chatsRef = collection(db, "chats");
        const chatQuery = query(chatsRef, where("participants", "array-contains", currentUserId));
        const chatSnapshot = await getDocs(chatQuery);

        console.log("🔥 Chats encontrados:", chatSnapshot.docs.map(doc => doc.data()));

        const userChats = chatSnapshot.docs.map((docSnap) => {
          const chat = docSnap.data() as ChatData;
          const otherUserId = chat.participants.find((id) => id !== currentUserId);
          const otherUser = firebaseUsers.find((user) => user.id === otherUserId);

          return {
            id: docSnap.id,
            participants: chat.participants,
            otherUser,
          };
        });

        setChats(userChats);
      } catch (error) {
        console.error("Erro ao buscar os chats:", error);
      } finally {
        setChatsLoading(false);
      }
    };

    if (firebaseUsers.length > 0) {
      fetchChats();
    }
  }, [auth.user?.email, firebaseUsers]);

  const handleNavigateToChat = (chatId: string) => {
    navigate({
      to: "/chat/$chatId",
      params: { chatId },
    });
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {/* 🔥 Sidebar com a lista de chats */}
      <Grid item xs={3} sx={{ height: "100vh", borderRight: `1px solid ${theme.palette.divider}`, overflowY: "auto" }}>
        <Typography variant="h6" sx={{ p: 2 }}>Seus Chats</Typography>
        {chatsLoading ? (
          <CircularProgress sx={{ mx: "auto", display: "block" }} />
        ) : chats.length > 0 ? (
          <List>
            {chats.map((chat, index) => (
              <Box key={chat.id}>
                <ListItem
                  button
                  onClick={() => handleNavigateToChat(chat.id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={chat.otherUser?.avatarUrl || "https://via.placeholder.com/50"}
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={chat.otherUser?.username || "Usuário Desconhecido"} />
                </ListItem>
                {index !== chats.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography sx={{ p: 2 }}>Nenhum chat encontrado.</Typography>
        )}
      </Grid>

      {/* 🔥 Conteúdo Principal */}
      <Grid item xs={9}>
        <Typography variant="h4">Chat</Typography>

        <Grid item xs={12} display="flex" alignItems="center" sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Pesquisar usuário"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mr: 2,
              backgroundColor: "#fff",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#999" },
                "&.Mui-focused fieldset": { borderColor: "#1976d2" },
              },
              "& .MuiInputLabel-root": { color: "#666" },
              "& .MuiInputBase-input": { color: "#333" },
            }}
          />
          <Button
            sx={{
              height: "100%",
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { background: theme.palette.primary.dark },
            }}
            type="button"
            aria-label="search"
          >
            <SearchIcon />
          </Button>
        </Grid>

        {/* 🔥 Seção de Pesquisa de Usuários */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="h6">Pesquisar Usuários</Typography>
          {isLoading ? (
            <CircularProgress />
          ) : data && data.length ? (
            <Grid container spacing={2}>
              {data
                .filter((user) => firebaseUsers.some((u) => u.username === user.username))
                .map((user) => {
                  const firebaseUser = firebaseUsers.find((u) => u.username === user.username);
                  return (
                    <Grid
                      key={user.id}
                      onClick={() => handleNavigateToChat(firebaseUser?.id || "")}
                      sx={{ cursor: "pointer" }}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <UserCard user={{ ...user, firebaseId: firebaseUser?.id || null }} />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <Typography>Nenhum usuário encontrado.</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
