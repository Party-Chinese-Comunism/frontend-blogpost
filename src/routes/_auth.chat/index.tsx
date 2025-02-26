import {
  Button,
  Grid2,
  IconButton,
  InputBase,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useListUsersById } from "../../hooks/useUsers/useListUsersById";
import { useSearchUsersByName } from "../../hooks/useUsers/useSearchUsersByName";

export const Route = createFileRoute("/_auth/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const {} = useListUsersById(search);
  const { data, isLoading } = useSearchUsersByName(search);
  return (
    <Grid2 container>
      <Grid2 size={12}>
        <Typography variant="h4">Chat</Typography>
      </Grid2>
      <Grid2 size={12} display={"flex"} my={2}>
        <TextField
          variant="outlined"
          placeholder="Pesquisar usuário"
          fullWidth
          sx={{
            mr: 2,
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#666",
            },
            "& .MuiInputBase-input": {
              color: "#333",
            },
          }}
        />

        <Button
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              background: theme.palette.primary.dark,
            },
          }}
          type="button"
          aria-label="search"
        >
          <SearchIcon />
        </Button>
      </Grid2>
    </Grid2>
  );
}
