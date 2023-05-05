import {
	FC,
	createContext,
	useContext,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";

const StreamContext = createContext(undefined as MediaStream | undefined);

export const useStream = () => {
	return useContext(StreamContext);
};

const StreamContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [myStream, setMyStream] = useState<MediaStream>();

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: false, video: true })
			.then((stream) => setMyStream(stream));
	}, []);
	return (
		<StreamContext.Provider value={myStream}>{children}</StreamContext.Provider>
	);
};

export default StreamContextProvider;
