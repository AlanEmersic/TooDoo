import api from "../util/api";

export const deleteTodoList = async (id: number): Promise<void> => {
  await api.delete(`/lists/${id}`);
};
