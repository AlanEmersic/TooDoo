import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Alert, Button, Container, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addTodo } from "../../api/todo/addTodo";
import { getTodos } from "../../api/todo/getTodos";
import { updateTodo } from "../../api/todo/updateTodo";
import { getTodoList } from "../../api/todoList/getTodoList";
import { updateTodoList } from "../../api/todoList/updateTodoList";
import { Todo } from "../../models/Todo.model";
import { TodoList as TodoListModel } from "../../models/TodoList.model";
import TodoForm from "../Todo/TodoForm";
import TodosGrid from "../Todo/TodosGrid";
import TodoListEditForm from "./TodoListEditForm";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string | null>(null);
  const [inputTextEdit, setInputTextEdit] = useState<string | null>(null);
  const [isShareLink, setIsShareLink] = useState<boolean>(false);
  const { id } = useParams();
  const [list, setList] = useState<TodoListModel>();

  useEffect(() => {
    getTodoList(Number(id))
      .then(setList)
      .catch((err) => {
        console.log("Get list error: ", err.response);
      });

    getTodos(Number(id))
      .then(setTodos)
      .catch((err) => {
        console.log("Get todos error: ", err.response);
      });
  }, []);

  const handleEditList = () => {
    setEdit(true);
  };

  const handleEditListSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();

    updateTodoList(Number(id), inputTextEdit)
      .then(() => {
        setEdit(false);
        setInputTextEdit(null);
        getTodos(Number(id)).then(setTodos);
      })
      .catch((err) => {
        console.log("Update todo list error: ", err.response);
      });
  };

  const handleInputTextEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTextEdit(event.target.value);
  };

  const handleInputText = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddTodo = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.reset();

    const todo: Todo = {
      listId: Number(id),
      text: String(inputText),
      completed: false,
    };

    addTodo(todo)
      .then(() => {
        setInputText(null);
        getTodos(Number(id)).then(setTodos);
      })
      .catch((err) => {
        console.log("Add todo error: ", err.response);
      });
  };

  const handleTodoCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    const updatedTodo = todo;
    updatedTodo.completed = event.target.checked;

    updateTodo(updatedTodo)
      .then(() => {
        getTodos(Number(id));
      })
      .catch((err) => {
        console.log("Update todo error: ", err.response);
      });
  };

  const handleShare = () => {
    const uuid = list?.uuid;
    const url = `http://localhost:3000/share/${uuid}`;
    navigator.clipboard.writeText(url);
    setIsShareLink(true);
  };

  return (
    <>
      <Container
        sx={{
          justifyContent: "center",
          textAlign: "center",
          margin: "1rem 0",
        }}
      >
        {list && <Typography variant="h3">{list.name}</Typography>}
        <Typography variant="h4">
          <Button
            variant="outlined"
            onClick={handleEditList}
            disabled={todos.length === 0}
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

        {edit && todos.length > 0 && (
          <TodoListEditForm
            handleEditListSubmit={handleEditListSubmit}
            handleInputTextEdit={handleInputTextEdit}
            inputTextEdit={inputTextEdit}
            setEdit={setEdit}
          />
        )}

        <TodoForm
          handleAddTodo={handleAddTodo}
          handleInputText={handleInputText}
          inputText={inputText}
        />
      </Container>

      <TodosGrid todos={todos} handleTodoCheckbox={handleTodoCheckbox} />
    </>
  );
}
