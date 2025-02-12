import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  Stack,
  Grid2,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    // Toggle o estado
    setIsFavorite((prev) => !prev);
  };

  return (
    <Grid2
      container
      spacing={3}
      justifyContent="center"
      sx={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Grid2
        size={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
              sx={{
                height: "40px",
              }}
            >
              <AnimatePresence mode="popLayout">
                {isFavorite ? (
                  <motion.div
                    key="favorite"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <FavoriteIcon sx={{ color: "red" }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="favoriteBorder"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <FavoriteBorderIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>
          </CardActions>
        </Card>
      </Grid2>
    </Grid2>
  );
}
