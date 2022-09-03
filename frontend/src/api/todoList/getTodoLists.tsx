import { TodoList } from "../../models/TodoList.model";
import api from "../util/api";

export const getTodoLists = async (): Promise<TodoList[]> => {
  const response = await api.get("/lists");
  const todoLists = response.data;  

  return todoLists;
};
