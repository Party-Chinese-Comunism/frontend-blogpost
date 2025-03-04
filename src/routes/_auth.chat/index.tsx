// src/routes/ChatRoute.tsx
import {
  Button,
  CircularProgress,
  Grid,
  Grid2,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSearchUsersByName } from "../../hooks/useUsers/useSearchUsersByName";
import UserCard from "./-components/UserCard";
import { useAuth } from "../../context/auth";
import { User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const Route = createFileRoute("/_auth/chat/")({
  component: RouteComponent,
});

type FirebaseUser = {
  id: string;
  username: string;
  email: string;
};

function RouteComponent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const auth = useAuth();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSearchUsersByName(search);
  const [firebaseUsers, setFirebaseUsers] = useState<FirebaseUser[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleNavigateToChat = async (otherUserId: string) => {
    try {
      const currentUserId = firebaseUsers.find(
        (user) => user.email === auth.user?.email
      )?.id;
      if (!currentUserId || !otherUserId) return;

      // Gera um ID de chat único baseado nos IDs dos usuários
      const getChatId = (userId1: string, userId2: string) => {
        const sortedIds = [userId1, userId2].sort();
        return `${sortedIds[0]}_${sortedIds[1]}`;
      };

      const chatId = getChatId(currentUserId, otherUserId);

      // Verifica se o chat já existe no Firestore
      const chatRef = doc(db, "chats", chatId);
      const chatSnapshot = await getDoc(chatRef);

      // Cria o chat se não existir
      if (!chatSnapshot.exists()) {
        await setDoc(chatRef, {
          participants: [currentUserId, otherUserId],
          createdAt: new Date(),
        });
      }

      // Navega para o chat com o ID gerado
      navigate({
        to: "/chat/$chatId",
        params: { chatId },
      });
    } catch (error) {
      console.error("Erro ao acessar o chat:", error);
    }
  };

  const allUsers = data
    ?.filter((user) => {
      return (
        user.id !== auth.user?.id &&
        firebaseUsers.some((u) => u.username === user.username)
      );
    })
    .map((user) => {
      const firebaseUser = firebaseUsers.find(
        (u) => u.username === user.username
      );
      return {
        ...user,
        firebaseId: firebaseUser?.id || null,
      };
    });

  return (
    <Grid2 container spacing={2} sx={{ p: 2 }}>
      <Grid2 size={12}>
        <Typography variant="h4">Chat</Typography>
      </Grid2>

      <Grid2 size={12} display="flex" alignItems="center">
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
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666",
            },
            "& .MuiInputBase-input": {
              color: "#333",
            },
          }}
        />
        <Button
          sx={{
            height: "100%",
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
          type="button"
          aria-label="search"
        >
          <SearchIcon />
        </Button>
      </Grid2>

      <Grid2
        size={{
          xs: 12,
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : allUsers && allUsers.length ? (
          <Grid2 container spacing={2}>
            {allUsers.map((user) => (
              <Grid2
                key={user.id}
                onClick={() => handleNavigateToChat(user.firebaseId || "")}
                sx={{
                  cursor: "pointer",
                }}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
              >
                <UserCard user={user} />
              </Grid2>
            ))}
          </Grid2>
        ) : search == "" ? (
          <Typography>Procure um usuário e faça conexões incríveis!</Typography>
        ) : (
          <Typography>
            Nenhum usuário encontrado com o nome "{search}".
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
}
