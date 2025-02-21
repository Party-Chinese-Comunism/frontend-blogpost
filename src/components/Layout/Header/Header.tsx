// components/Header.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  useTheme,
  Button,
  Tooltip,
  CircularProgress,
  Popper,
  Paper,
  ClickAwayListener,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AccountCircle from "@mui/icons-material/AccountCircle";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useAuth } from "../../../context/auth";
import { useLayout } from "../../../context/layoutContext";
import { Link } from "@tanstack/react-router";
import logo from "../../../assets/logo.png";

export const Header = () => {
  const { collapsed, isMobile, handleToggleSidebar } = useLayout();
  const { logout, user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const effectiveSidebarWidth = isMobile ? 240 : collapsed ? 0 : 240;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: theme.palette.primary.main,
        zIndex: theme.zIndex.drawer + 1,
        ml: !isAuthenticated ? 0 : isMobile ? 0 : `${effectiveSidebarWidth}px`,
        width: !isAuthenticated
          ? "100%"
          : isMobile
            ? "100%"
            : `calc(100% - ${effectiveSidebarWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        {isMobile && isAuthenticated && (
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            onClick={handleToggleSidebar}
            sx={{
              mr: 2,
              color: theme.palette.text.primary,
              background: theme.palette.primary.main,
              "&:hover": {
                background: theme.palette.primary.dark,
              },
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <Link to="/">
          <Box
            component={"img"}
            src={logo}
            alt="logo"
            sx={{
              height: 40,
              width: 40,
            }}
          ></Box>
        </Link>
        <Box sx={{ flexGrow: 1 }} />

        {isAuthenticated ? (
          <Button
            color="secondary"
            sx={{
              fontWeight: 600,
              p: 1,
              ml: 2,
              color: theme.palette.common.white,
              "&:hover": {
                color: theme.palette.primary.main,
                background: theme.palette.common.white,
              },
              "&:active": {
                color: theme.palette.primary.main,
                background: theme.palette.common.white,
              },
            }}
            variant="outlined"
            onClick={handleOpenProfile}
          >
            <AccountCircle
              sx={{
                mr: {
                  xs: 0,
                  md: 1,
                },
              }}
            />
            {!isMobile && user?.username}
          </Button>
        ) : (
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
              sx={{}}
            >
              Entrar
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
            >
              Cadastrar
            </Button>
          </Box>
        )}

        <Popper
          sx={{
            position: "absolute",
            zIndex: 999999,
          }}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
        >
          <ClickAwayListener onClickAway={handleCloseProfile}>
            <Paper
              sx={{
                mt: 1,
                p: 2,
                width: 250,
                boxShadow: 3,
                backgroundColor: "#FFFFFF",
              }}
            >
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems={"center"} gap={2}>
                  <PersonOutlineOutlinedIcon
                    color="primary"
                    fontSize={"large"}
                  />

                  <Box>
                    <Box sx={{ fontWeight: "bold", fontSize: "0.875rem" }}>
                      {user?.username}
                    </Box>
                    <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                      {"Seguidores"}
                    </Box>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => {
                    handleCloseProfile();
                    logout();
                  }}
                  sx={{ alignSelf: "start", mt: 0.5 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Toolbar>
    </AppBar>
  );
};
