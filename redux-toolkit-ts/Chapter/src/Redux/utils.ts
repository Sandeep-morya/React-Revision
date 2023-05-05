import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import axios from "axios";

import store from "./store";

const { getState, dispatch } = store;

type RootState = ReturnType<typeof getState>;
type AppDispatch = typeof dispatch;

// :: useAppSelector Hook ::
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// :: useAppDispatch Hook ::
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Axios API Creation
export const API = axios.create({
	baseURL: "https://jsonplaceholder.typicode.com",
});
