import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

type Props = {
  theme: string;
  toggleTheme: () => void;
  handleDrawerToggle?: () => void;
};

export function Header({ theme, toggleTheme, handleDrawerToggle }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeFlix
          </Typography>

          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
