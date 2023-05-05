import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import store from "./store";

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<Dispatch>();
const useSlice = (sliceName: keyof RootState) => {
	return useSelector((store: RootState) => store[sliceName]);
};

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export { API, useSlice };
export default useAppDispatch;
