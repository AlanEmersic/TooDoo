import { User } from "../../models/User.model";
import api from "../util/api";

export const registerUser = async (user: User): Promise<void> => {
  await api.post("/users/register", user);  
};
