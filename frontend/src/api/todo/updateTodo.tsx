import { Todo } from "../../models/Todo.model";
import api from "../util/api";

export const updateTodo = async (todo: Todo): Promise<void> => {
  await api.put(`/todos/${todo.id}`, todo);
};
