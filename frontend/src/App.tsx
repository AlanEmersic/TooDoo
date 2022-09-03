import { Container } from "@mui/system";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import SharedTodoList from "./components/Todolist/SharedTodoList";
import TodoList from "./components/Todolist/TodoList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ROUTE_PATHS } from "./utils/routePaths";

function App() {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTE_PATHS.Login} />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTE_PATHS.Home} element={<Home />} />
          <Route path={ROUTE_PATHS.List} element={<TodoList />} />
        </Route>

        <Route path={ROUTE_PATHS.Register} element={<Register />} />
        <Route path={ROUTE_PATHS.Login} element={<Login />} />
        <Route path={ROUTE_PATHS.SharedList} element={<SharedTodoList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
