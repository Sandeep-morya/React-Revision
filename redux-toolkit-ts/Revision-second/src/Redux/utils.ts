import {
	useDispatch as x,
	useSelector as y,
	TypedUseSelectorHook,
} from "react-redux";
import store from "./store";

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = y;

export const useDispatch = () => x<Dispatch>();

export const useSlice = (slice: keyof RootState) => {
	return y((state: RootState) => state[slice]);

	// :: or 👇 ::
	// return useSelector((store) => store[slice]);
};
