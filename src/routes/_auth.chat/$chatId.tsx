// src/routes/_auth/chat/$chatId.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../../firebase";
import ChatRoom from "./-components/ChatRoom";
import { Button } from "@mui/material";

export const Route = createFileRoute("/_auth/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { chatId } = Route.useParams();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <div>Usuário não autenticado</div>;
  }

  return (
    <div>
      <Button
        variant="contained"
        component={Link}
        to={"/chat"}
        sx={{
          mb: 2,
        }}
      >
        Voltar
      </Button>
      <ChatRoom chatId={chatId} currentUserId={currentUser.uid} />
    </div>
  );
}
