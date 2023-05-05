import React, { useRef } from "react";
import useObserver from "../hooks/useObserver";

type Props = {};

const Projects = (props: Props) => {
  const ref = useRef(null);
	const active = useObserver(ref);
	if (active) {
		console.log("Projects");
	}
	return (
		<div ref={ref} id="projects" className="same hidden">
			<h1>Projects</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
				excepturi doloremque architecto sapiente eveniet quod commodi vitae
				animi nam, perspiciatis, eius, maxime voluptatum deleniti? Tempore,
				maiores eveniet. Consequuntur repellat distinctio nemo dolores maiores
				mollitia non excepturi iure pariatur, repellendus quam nostrum quod,
				alias voluptatibus officiis laudantium quibusdam sit vel ipsum.
				Excepturi dignissimos repellat exercitationem optio. Fugit aliquid enim
				natus deleniti at iste optio voluptate adipisci voluptatem maiores
				laborum, possimus amet, nesciunt explicabo tempora! Dolorem perferendis
				quia ex non dolorum praesentium, exercitationem vel voluptate officiis
				similique quibusdam aliquid nisi nostrum voluptatibus ullam! Porro
				nostrum sint at expedita repudiandae nesciunt quo alias dolor in dolorem
				voluptate nulla quae libero fuga minus itaque, non numquam, velit omnis!
				Aliquid molestias exercitationem cum in alias minus ex explicabo animi
				illo excepturi, quidem at aliquam harum nostrum tempora adipisci eos,
				iure tempore corrupti eum est sint incidunt eligendi. Adipisci
				voluptatum modi laborum quidem doloremque perspiciatis ea praesentium
				reprehenderit, deleniti nisi enim veniam error, dolorem nemo numquam
				amet maxime vero quo! Officiis aspernatur, eius velit quibusdam facilis
				qui modi odit recusandae quasi ullam consequuntur illo praesentium aut
				vitae minus dignissimos laboriosam. Distinctio, quia reprehenderit? Cum
				at enim sequi voluptatem vel nostrum commodi excepturi tempora natus
				necessitatibus laborum quas quos atque sint, veritatis id, voluptate
				facilis reprehenderit consequuntur ipsam! Sunt aperiam consectetur,
				incidunt, omnis accusantium, molestias doloribus asperiores sapiente
				neque quod hic. Nostrum recusandae earum atque assumenda impedit laborum
				facere quis dicta? Quibusdam commodi vero
			</p>
		</div>
	);
};

export default Projects;
