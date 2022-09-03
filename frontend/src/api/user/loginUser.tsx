import api from "../util/api";

export const loginUser = async (
  username: string | null,
  password: string | null
): Promise<string> => {
  const response = await api.post("/users/login", { username, password });
  const { token } = response.data;

  return token;
};
