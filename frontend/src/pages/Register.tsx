import { Container, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { registerUser } from "../api/user/registerUser";
import RegisterForm from "../components/Register/RegisterForm";
import { User } from "../models/User.model";

export default function Register() {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();
    setIsSuccess(false);

    const user: User = { username, password, email };
    registerUser(user)
      .then((res: any) => {
        if (res.status === 200) {
          setIsSuccess(true);
          setUsername("");
          setPassword("");
          setEmail("");
        }
      })
      .catch((err) => {
        console.log("Registration error: ", err.response);
      });
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

      <RegisterForm
        user={{ username, password, email }}
        handleSubmit={handleSubmit}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleEmailChange={handleEmailChange}
      />

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
