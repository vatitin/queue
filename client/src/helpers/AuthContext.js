import { createContext } from "react";

export const AuthContext = createContext({
    email: "",
    id: 0,
    status: false,
  });