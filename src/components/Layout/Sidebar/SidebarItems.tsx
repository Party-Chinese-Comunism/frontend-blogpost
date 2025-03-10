import { FileRoutesByPath } from "@tanstack/react-router";
import { JSX } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";

type AppRoutePaths = FileRoutesByPath[keyof FileRoutesByPath]["path"];

export interface SidebarItem {
  label: string;
  icon?: JSX.Element;
  path?: AppRoutePaths;
  children?: SidebarItem[];
  role?: string;
  isNew?: boolean;
  notificationCount?: number;
}

const user = (() => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser).user; 
    }
  } catch (error) {
    console.error("Erro ao recuperar usuário do localStorage", error);
  }
  return null;
})();

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    label: "Meu Perfil",
    icon: <DashboardIcon />,
    path: `/user/${user.id}` as any,
  },
  {
    label: "Meus Posts",
    icon: <BarChartOutlinedIcon />,
    path: "/my-posts",
  },
  {
    label: "Criar Post",
    icon: <SummarizeIcon />,
    path: "/new-post",
  },
  {
    label: "Favoritos",
    icon: <SummarizeIcon />,
    path: "/favorites",
  },
  {
    label: "Chat",
    icon: <ChatIcon />,
    path: "/chat",
  },
];
