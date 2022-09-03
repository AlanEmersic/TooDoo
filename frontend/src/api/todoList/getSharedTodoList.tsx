import { Todo } from "../../models/Todo.model";
import api from "../util/api";

export const getSharedTodoList = async (uuid: string): Promise<Todo[]> => {
  const response = await api.get(`/lists/share/${uuid}`);
  const todos = response.data;

  return todos;
};
