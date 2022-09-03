import api from "../util/api";

export const updateTodoList = async (
  id: number,
  name: string | null
): Promise<void> => {
  await api.put(`/lists/${id}`, { name });
};
