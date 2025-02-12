import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
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
} from '@mui/material'
import { AuthContext, useAuth } from '../context/auth';
import MenuIcon from '@mui/icons-material/Menu';
interface MyRouterContext {
  auth: AuthContext;
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const auth = useAuth()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  // Links que serão exibidos no menu
  const pages = [
    { label: 'Meus Posts', to: '/my-posts' },
    { label: 'Criar Post', to: '/new-post' },
    { label: 'Favoritos', to: '/favorites' },
  ]

  // Funções que controlam o menu do mobile
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        sx={{ my: 2, textDecoration: 'none', color: 'inherit' }}
        component={Link}
        to="/"
      >
        Blog
      </Typography>
      <Divider />
      <List>
        {pages.map(({ label, to }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              sx={{ textAlign: 'left' }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {auth.isAuthenticated ? (
        <Button
          onClick={auth.logout}
          sx={{ my: 1, display: 'block', width: '100%' }}
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          to="/login"
          sx={{ my: 1, display: 'block', width: '100%' }}
        >
          Login
        </Button>
      )}
    </Box>
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>

              {/* Título (desktop) */}
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Blog
              </Typography>

              {/* Ícone “hamburger” (mobile) */}
              {isMobile && (
                <IconButton
                  size="large"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  color="inherit"
                  sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Botões do menu (desktop) */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map(({ label, to }) => (
                  <Button
                    key={label}
                    component={Link}
                    to={to}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>

              {/* Login/Logout (desktop) */}
              {!isMobile && (
                <>
                  {auth.isAuthenticated ? (
                    <Button color="inherit" onClick={auth.logout}>
                      Logout
                    </Button>
                  ) : (
                    <Button component={Link} to="/login" color="inherit">
                      Login
                    </Button>
                  )}
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Drawer (sidebar) para mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>



      </Box>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
