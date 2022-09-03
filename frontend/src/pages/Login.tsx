import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import { ChangeEvent, useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user/loginUser";
import { ROUTE_PATHS } from "../utils/routePaths";

export default function Login() {
  const [password, setPassword] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    loginUser(username, password)
      .then((token: string) => {
        localStorage.setItem("token", token);
        const decoded = jwt_decode(token);
        localStorage.setItem("user", JSON.stringify(decoded));
      })
      .catch((err) => {
        console.log("Login error: ", err.response);
      })
      .finally(() => {
        navigate(`${ROUTE_PATHS.Home}`);
      });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Container
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        Login
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: "center",
            margin: "1rem 0",
          }}
        >
          <TextField
            id="username"
            label="Enter username"
            variant="outlined"
            onChange={handleUsernameChange}
          />

          <TextField
            id="password"
            label="Enter password"
            variant="outlined"
            type="password"
            onChange={handlePasswordChange}
          />

          <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={!username || !password}
            >
              Login
            </Button>
            <Button variant="outlined">
              <NavLink
                to={ROUTE_PATHS.Register}
                style={{ textDecorationLine: "none" }}
              >
                Register
              </NavLink>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
