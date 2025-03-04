// src/components/SendMessageForm.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";
import {
  Box,
  IconButton,
  TextField,
  CircularProgress,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface SendMessageFormProps {
  chatId: string;
  currentUserId: string;
}

async function sendMessage({
  chatId,
  currentUserId,
  text,
}: {
  chatId: string;
  currentUserId: string;
  text: string;
}) {
  if (!text.trim()) throw new Error("Mensagem vazia");

  // Verificar se o chat existe
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) {
    throw new Error("Conversa não encontrada");
  }

  // Obter dados do usuário
  const userRef = doc(db, "users", currentUserId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error("Usuário não encontrado");
  }

  const userData = userSnap.data();
  if (!userData.username) {
    throw new Error("Username não configurado");
  }

  // Adicionar mensagem
  return await addDoc(collection(db, "chats", chatId, "messages"), {
    text: text.trim(),
    senderId: currentUserId,
    senderUserName: userData.username,
    createdAt: serverTimestamp(),
  });
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  chatId,
  currentUserId,
}) => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const mutation = useMutation({
    mutationFn: (vars: {
      chatId: string;
      currentUserId: string;
      text: string;
    }) => sendMessage(vars),
    onSuccess: () => setText(""),
    onError: (error: Error) => setError(error.message),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (text.trim()) {
      mutation.mutate({ chatId, currentUserId, text });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        pt: 1,
        bgcolor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite sua mensagem..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              bgcolor: "background.paper",
            },
          }}
          autoComplete="off"
        />

        <IconButton
          type="submit"
          color="primary"
          disabled={mutation.isPending || !text.trim()}
          sx={{
            height: 48,
            width: 48,
            flexShrink: 0,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          {mutation.isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <SendIcon />
          )}
        </IconButton>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SendMessageForm;
