﻿import React from "react";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<nav className="navbar">
			<a href="#">Home</a>
			<a href="#about">About</a>
			<a href="#skills">Skills</a>
			<a href="#projects">Projects</a>
			<a href="#contact">Contact</a>
		</nav>
	);
};

export default Navbar;
