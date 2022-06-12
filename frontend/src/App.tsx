import { Container } from "@mui/system";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";
import SharedTodoList from "./components/SharedTodoList";

function App() {
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  return (
    <Container>
      <NavBar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            loggedUser ? (
              <Navigate to="/home" />
            ) : (
              <Login setLoggedUser={setLoggedUser} />
            )
          }
        />
        <Route
          path="/home"
          element={loggedUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/list/:id"
          element={loggedUser ? <TodoList /> : <Navigate to="/login" />}
        />
        <Route path="/share/:uuid" element={<SharedTodoList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
