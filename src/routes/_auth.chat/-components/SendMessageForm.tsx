// src/components/SendMessageForm.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

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
  if (!text.trim()) return;

  return await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId: currentUserId,
    createdAt: serverTimestamp(),
  });
}

const SendMessageForm: React.FC<SendMessageFormProps> = ({
  chatId,
  currentUserId,
}) => {
  const [text, setText] = useState("");

  // Usando React Query para mutação
  const mutation = useMutation({
    mutationFn: (vars: {
      chatId: string;
      currentUserId: string;
      text: string;
    }) => sendMessage(vars),
    onSuccess: () => {
      setText("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ chatId, currentUserId, text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite sua mensagem"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default SendMessageForm;
