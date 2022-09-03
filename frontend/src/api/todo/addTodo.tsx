import { Todo } from "../../models/Todo.model";
import api from "../util/api";

export const addTodo = async (todo: Todo): Promise<void> => {
  await api.post("/todos", todo);
};
