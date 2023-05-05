import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import store from "./store";

const { getState, dispatch } = store;

export const useAppDispatch = () => useDispatch<typeof dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof getState>> =
	useSelector;
