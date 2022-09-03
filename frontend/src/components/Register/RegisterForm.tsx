import { Button, Stack, TextField } from "@mui/material";
import { FormEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { User } from "../../models/User.model";
import { ROUTE_PATHS } from "../../utils/routePaths";

type RegisterFormProps = {
  user: User;
  handleSubmit: FormEventHandler;
  handleUsernameChange: FormEventHandler;
  handlePasswordChange: FormEventHandler;
  handleEmailChange: FormEventHandler;
};

export default function RegisterForm({
  user,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleEmailChange,
}: RegisterFormProps) {
  return (
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
            disabled={!user.username || !user.password || !user.email}
          >
            Register
          </Button>
          <Button variant="outlined">
            <NavLink
              to={ROUTE_PATHS.Login}
              style={{ textDecorationLine: "none" }}
            >
              Login
            </NavLink>
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
