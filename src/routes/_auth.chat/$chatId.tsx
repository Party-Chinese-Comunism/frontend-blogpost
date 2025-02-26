import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../context/auth";
import ChatRoom from "./-components/ChatRoom";

export const Route = createFileRoute("/_auth/chat/$chatId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { chatId } = Route.useParams();
  const auth = useAuth();

  return (
    <div>
      <h1>Chat - {chatId}</h1>
      <ChatRoom
        chatId={chatId}
        currentUserId={auth.user?.id.toString() as string}
      />
    </div>
  );
}
