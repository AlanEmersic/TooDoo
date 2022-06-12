import { Typography, TextField, Stack, Button, Container } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.target.reset();
    setIsSuccess(false);

    const user = { username, password, email };

    const register = async () => {
      await api
        .post("/users/register", user)
        .then((res: any) => {
          if (res.status === 200) {
            setIsSuccess(true);
            setUsername(null);
            setPassword(null);
            setEmail(null);
          }
        })
        .catch((err) => {
          console.log("Registration error: ", err.response);
        });
    };

    register();
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
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
          
          <TextField
            id="email"
            label="Enter email"
            variant="outlined"
            type="email"
            onChange={handleEmailChange}
          />          

          <Stack spacing={2} direction="row" style={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              type="submit"
              disabled={!username || !password || !email}
            >
              Register
            </Button>
            <Button variant="outlined">
              <NavLink to="/login" style={{ textDecorationLine: "none" }}>
                Login
              </NavLink>
            </Button>
          </Stack>
          
        </Stack>
      </form>
      {isSuccess && (
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "green" }}
        >
          Registration was successful!
        </Typography>
      )}
    </Container>
  );
}
