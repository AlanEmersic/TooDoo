import { v4 as uuidv4 } from "uuid";
import api from "../util/api";

export const postTodoList = async (name: string): Promise<void> => {
  const uuid = uuidv4();

  await api.post("/lists", { name, uuid });
};
