import { FileRoutesByPath } from "@tanstack/react-router";
import { JSX } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import SummarizeIcon from "@mui/icons-material/Summarize";
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

export const SIDEBAR_ITEMS: SidebarItem[] = [
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
];
