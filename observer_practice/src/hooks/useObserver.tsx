import React, { useEffect, useRef, useState } from "react";

type Props = {};

const useObserver = (ref: React.RefObject<any>) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			setActive(entry.isIntersecting);
		});
		observer.observe(ref.current as Element);
	}, []);
	return active;
};

export default useObserver;
