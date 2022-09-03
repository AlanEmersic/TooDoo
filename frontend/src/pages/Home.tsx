import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteTodoList } from "../api/todoList/deleteTodoList";
import { getTodoLists } from "../api/todoList/getTodoLists";
import TodoListForm from "../components/Todolist/TodoListForm";
import TodoListsGrid from "../components/Todolist/TodoListsGrid";
import { TodoList } from "../models/TodoList.model";

export default function Home() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openTodoListForm, setOpenTodoListForm] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);
    getTodoLists()
      .then(setLists)
      .catch((err) => {
        console.log("TodoList error: ", err.response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleOpenTodoListForm = () => setOpenTodoListForm(true);

  const handleNavigateList = (id: number) => {
    navigate(`/list/${id}`);
  };

  const handleDeleteList = (id: number) => {
    deleteTodoList(id).then(() =>
      setLists(lists.filter((list) => list.id !== id))
    );
  };

  return isFetching ? (
    <Skeleton
      variant="rectangular"
      sx={{ backgroundColor: "dodgerblue", height: "15em" }}
    />
  ) : (
    <>
      <TodoListForm
        setLists={setLists}
        handleOpenTodoListForm={handleOpenTodoListForm}
        openTodoListForm={openTodoListForm}
        setOpenTodoListForm={setOpenTodoListForm}
      />

      <TodoListsGrid
        lists={lists}
        handleNavigateList={handleNavigateList}
        handleDeleteList={handleDeleteList}
      />
    </>
  );
}
