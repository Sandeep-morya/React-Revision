import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

type Props = {};

const App = (props: Props) => {
	return (
		<div className="app">
			<Navbar />
			<Intro />
			<About />
			<Skills />
			<Projects />
			<Contact />
		</div>
	);
};

export default App;
