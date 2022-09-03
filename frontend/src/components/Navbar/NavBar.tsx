import AddTaskIcon from "@mui/icons-material/AddTask";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../utils/routePaths";

export default function NavBar() {
  const isUserLogged = localStorage.getItem("token") ? !!localStorage.getItem("token") : false;
  const navigate = useNavigate();  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(`${ROUTE_PATHS.Login}`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AddTaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="h1"            
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TooDoo
          </Typography>

          {isUserLogged && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link
                to={ROUTE_PATHS.Home}
                style={{ textDecorationLine: "none" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Home
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  paddingLeft: "50rem",
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
