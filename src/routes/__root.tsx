import * as React from "react";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { AuthContext, useAuth } from "../context/auth";
import MenuIcon from "@mui/icons-material/Menu";
interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const pages = [
    { label: "Meus Posts", to: "/my-posts" },
    { label: "Criar Post", to: "/new-post" },
    { label: "Favoritos", to: "/favorites" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ py: 1 }}>
        <Typography
          variant="h6"
          sx={{ textDecoration: "none", color: "inherit" }}
          component={Link}
          to="/"
        >
          Blog
        </Typography>
      </Box>
      <Divider />

      <List>
        {pages.map(({ label, to }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} to={to} sx={{ textAlign: "left" }}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {isMobile && auth.isAuthenticated && (
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                color="inherit"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Blog
            </Typography>
            {!isMobile ||
              (auth.isAuthenticated && (
                <Box display={"flex"} gap={3}>
                  {pages.map(({ label, to }) => (
                    <Button
                      key={label}
                      component={Link}
                      to={to}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {label}
                    </Button>
                  ))}
                </Box>
              ))}

            <>
              {auth.isAuthenticated ? (
                <Button color="inherit" onClick={auth.logout}>
                  Logout
                </Button>
              ) : (
                <Box display={"flex"} gap={2}>
                  <Button component={Link} to="/login" color="inherit">
                    Entrar
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/register"
                    color="inherit"
                  >
                    Cadastrar
                  </Button>
                </Box>
              )}
            </>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>

      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
