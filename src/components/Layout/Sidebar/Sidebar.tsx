import { Link, useLocation } from "@tanstack/react-router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import logo from "../../../assets/logo.png";
import { SidebarItem, SIDEBAR_ITEMS } from "./SidebarItems";
import { useLayout } from "../../../context/layoutContext";
import { useAuth } from "../../../context/auth";

const getItemNotificationCount = (item: SidebarItem): number => {
  let total = item.notificationCount ?? 0;
  if (item.children) {
    for (const child of item.children) {
      total += getItemNotificationCount(child);
    }
  }
  return total;
};

const Sidebar = () => {
  const {
    setCollapsed,
    setOpenMenus,
    setToggled,
    collapsed,
    isMobile,
    toggleMenu,
    openMenus,
    toggled,
  } = useLayout();
  const location = useLocation();
  const theme = useTheme();
  const effectiveSidebarWidth = isMobile ? 240 : collapsed ? 64 : 240;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    updateOpenMenusBasedOnCurrentPath();
  }, [location.pathname]);

  useEffect(() => {
    if (!collapsed) {
      updateOpenMenusBasedOnCurrentPath();
    }
  }, [collapsed]);

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    preloadImage(logo);
  }, []);

  const updateOpenMenusBasedOnCurrentPath = () => {
    const isActiveInTree = (
      item: SidebarItem,
      currentPath: string
    ): boolean => {
      if (item.path && currentPath === item.path) return true;
      if (item.children) {
        return item.children.some((child) =>
          isActiveInTree(child, currentPath)
        );
      }
      return false;
    };

    const findOpenMenus = (items: SidebarItem[]): Record<string, boolean> => {
      const newOpen: Record<string, boolean> = {};
      items.forEach((item) => {
        if (item.children) {
          if (
            item.children.some((child) =>
              isActiveInTree(child, location.pathname)
            )
          ) {
            newOpen[item.label] = true;
            Object.assign(newOpen, findOpenMenus(item.children));
          }
        }
      });
      return newOpen;
    };

    const newOpenMenus = findOpenMenus(SIDEBAR_ITEMS);
    setOpenMenus((prev) => ({ ...prev, ...newOpenMenus }));
  };

  const renderSidebarItems = (items: SidebarItem[], nesting = 0) => {
    return items.map((item) => {
      return (
        <ListItemButton key={item.label} component={Link} to={item.path!}>
          {item.icon && (
            <ListItemIcon sx={{ color: theme.palette.common.white }}>
              {item.icon}
            </ListItemIcon>
          )}
          {!collapsed && (
            <ListItemText
              sx={{ color: theme.palette.common.white }}
              primary={item.label}
            />
          )}
        </ListItemButton>
      );
    });
  };

  return (
    <>
      {collapsed && (
        <IconButton
          onClick={() => setCollapsed(false)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            background: theme.palette.primary.main,
            color: "white",
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? toggled : true}
        onClose={() => setToggled(false)}
        sx={{
          width: effectiveSidebarWidth,
          height: "100vh",
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          "& .MuiDrawer-paper": {
            width: effectiveSidebarWidth,
            position: "relative",
            background: theme.palette.primary.main,
            transition: theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            height: "100vh",
            overflowY: "auto",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Box
            component={Link}
            to="/"
            display="flex"
            alignItems="center"
            sx={{ width: collapsed ? 64 : "auto" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                objectFit: "contain",
                height: collapsed ? 40 : 50,
                transition: "height 0.3s ease",
              }}
            />
            {!collapsed && (
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 1, color: theme.palette.common.white }}
              >
                Iris
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <List>{renderSidebarItems(SIDEBAR_ITEMS)}</List>
      </Drawer>
    </>
  );
};

export default Sidebar;
