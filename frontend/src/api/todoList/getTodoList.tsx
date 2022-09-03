import { TodoList } from "../../models/TodoList.model";
import api from "../util/api";

export const getTodoList = async (id: number): Promise<TodoList> => {
  const response = await api.get(`/lists/${id}`);
  const todoList = response.data;

  return todoList;
};
