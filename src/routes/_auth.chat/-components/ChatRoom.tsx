// src/components/ChatRoom.tsx
import React from "react";
import { useChatMessages } from "../../../hooks/useChat/useChatMessages";
import SendMessageForm from "./SendMessageForm";

interface ChatRoomProps {
  chatId: string;
  currentUserId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chatId, currentUserId }) => {
  // Hook que traz as mensagens em tempo real
  const messages = useChatMessages(chatId);

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "8px",
          marginBottom: "8px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "4px 0" }}>
            <strong>
              {msg.senderId === currentUserId ? "Você" : msg.senderId}
            </strong>
            : {msg.text}
          </div>
        ))}
      </div>
      <SendMessageForm chatId={chatId} currentUserId={currentUserId} />
    </div>
  );
};

export default ChatRoom;
