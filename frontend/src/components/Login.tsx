import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import api from "../utils/api";
import { NavLink } from "react-router-dom";

export default function Login({ setLoggedUser }: any) {
  const [isFetching, setIsFetching] = useState(false);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const login = async () => {
      setIsFetching(true);
      
      await api
        .post("/users/login", { username, password })
        .then((res: any) => {
          localStorage.setItem("token", res.data.token);
          const decoded = jwt_decode(res.data.token);
          localStorage.setItem("user", JSON.stringify(decoded));
          setLoggedUser(username);
        })
        .catch((err) => {
          console.log("Login error: ", err.response);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };

    login();
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
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
              <NavLink to="/register" style={{ textDecorationLine: "none" }}>
                Register
              </NavLink>
            </Button>
          </Stack>

        </Stack>
      </Box>
    </Container>
  );
}
