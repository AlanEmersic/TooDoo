import {
  Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedTodoList } from "../../api/todoList/getSharedTodoList";
import { Todo } from "../../models/Todo.model";
import PageNotFound from "../../pages/PageNotFound";
import TodosGrid from "../Todo/TodosGrid";

export default function SharedTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { uuid } = useParams();

  useEffect(() => {
    setIsFetching(true);

    getSharedTodoList(String(uuid))
      .then(setTodos)
      .catch((err) => {
        console.log("Share todo list error: ", err.response);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return isFetching ? (
    <Skeleton variant="rectangular" width="100%" height="100%" />
  ) : todos?.length === 0 ? (
    <PageNotFound />
  ) : (
    <TodosGrid todos={todos} handleTodoCheckbox={() => {}} />
  );
}
