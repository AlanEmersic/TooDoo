import { Todo } from "../../models/Todo.model";
import api from "../util/api";

export const getTodos = async (id: number): Promise<Todo[]> => {
  const response = await api.get(`/lists/${id}/todos`);
  const todos = response.data;  

  return todos;
};
