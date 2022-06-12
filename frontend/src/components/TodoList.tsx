import {
  Alert,
  Button,
  Checkbox,
  Container,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import ShareIcon from "@mui/icons-material/Share";
import PageNotFound from "./PageNotFound";

export default function TodoList() {
  const [todos, setTodos] = useState<any>([]);
  const [edit, setEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [inputText, setInputText] = useState(null);
  const [inputTextEdit, setInputTextEdit] = useState(null);
  const [userCanEdit, setUserCanEdit] = useState(false);
  const [isShareLink, setIsShareLink] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    setIsFetching(true);

    await api
      .get(`/lists/${id}`)
      .then((res) => {
        setTodos(res.data);

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setUserCanEdit(user.id === res.data[0].userId);
      })
      .catch((err) => {
        console.log("Get todos error: ", err.response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const updateTodoList = async () => {
    const list = { name: inputTextEdit };

    await api
      .put(`/lists/${id}`, list)
      .then((res) => {
        setEdit(false);
        setInputTextEdit(null);
        getTodos();
      })
      .catch((err) => {
        console.log("Update todo list error: ", err.response);
      });
  };

  const addTodo = async () => {
    const todo = {
      listId: id,
      text: inputText,
      completed: false,
    };

    await api
      .post("/todos", todo)
      .then((res) => {
        setInputText(null);
        getTodos();
      })
      .catch((err) => {
        console.log("Add todo error: ", err.response);
      });
  };

  const updateTodo = async (todo: any) => {
    await api
      .put(`/todos/${todo.todoId}`, todo)
      .then((res) => {
        getTodos();
      })
      .catch((err) => {
        console.log("Update todo error: ", err.response);
      });
  };

  const handleEditList = () => {
    setEdit(true);
  };

  const handleEditListSubmit = (event: any) => {
    event.preventDefault();
    event.target.reset();
    updateTodoList();
  };

  const handleInputTextEdit = (event: any) => {
    setInputTextEdit(event.target.value);
  };

  const handleInputText = (event: any) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = (event: any) => {
    event.preventDefault();
    event.target.reset();
    addTodo();
  };

  const handleTodoCheckbox = (event: any, todo: any) => {
    const updatedTodo = todo;
    updatedTodo.completed = event.target.checked;
    updateTodo(updatedTodo);
  };

  const handleShare = (event: any) => {
    const uuid = todos[0].uuid;
    const url = "http://localhost:3000/share/" + uuid;    
    navigator.clipboard.writeText(url);
    setIsShareLink(true);
  };

  return isFetching ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : todos?.length === 0 || !userCanEdit ? (
    <PageNotFound />
  ) : (
    <>
      <Container
        sx={{
          justifyContent: "center",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        <Typography variant="h4">
          {todos && todos[0]?.name}{" "}
          <Button
            variant="outlined"
            onClick={handleEditList}            
          >
            <EditIcon /> Edit
          </Button>
          <Button
            sx={{ margin: "0 1rem" }}
            variant="outlined"
            onClick={handleShare}            
          >
            <ShareIcon /> Share
          </Button>
          {isShareLink && (
            <Alert severity="success" sx={{ justifyContent: "center" }}>
              Link copied to clipboard!
            </Alert>
          )}
        </Typography>
        {edit && (
          <form onSubmit={handleEditListSubmit}>
            <Stack
              direction="row"
              sx={{ justifyContent: "center", margin: "1rem 0" }}
            >
              <TextField
                id="inputTextEdit"
                label="Edit list"
                variant="outlined"
                onChange={handleInputTextEdit}
              />
              <Button
                variant="outlined"
                type="submit"
                disabled={!inputTextEdit}
              >
                <CheckIcon />
              </Button>
              <Button variant="outlined" onClick={() => setEdit(false)}>
                <CancelIcon />
              </Button>
            </Stack>
          </form>
        )}
        <form onSubmit={handleAddTodo}>
          <Stack
            direction="row"
            sx={{ justifyContent: "center", margin: "1rem 0" }}
          >
            <TextField
              id="inputText"
              label="Add a to-do"
              variant="outlined"
              onChange={handleInputText}
            />
            <Button
              variant="outlined"
              type="submit"
              disabled={!inputText}
            >
              <AddIcon />
            </Button>
          </Stack>
        </form>
      </Container>
      <Container
        sx={{
          my: "2rem",
        }}
      >
        <Grid
          container
          spacing={5}
          mb={15}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {todos?.[0]?.todoId &&
            todos.map((t: any, index: number) => {
              return (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    <Checkbox
                      checked={!!t.completed}
                      onClick={(e) => handleTodoCheckbox(e, t)}
                    />
                    <Button>{t.text}</Button>
                  </Stack>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
