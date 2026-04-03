import { configureStore } from "@reduxjs/toolkit";
import loginreducers from "../Reducers/loginReducers/loginSlice";

export const store = configureStore({ reducer: loginreducers });
