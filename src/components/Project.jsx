import React from 'react';
import Card from './CardItem';
function Project({ title, img, links, description }) {
	return (
		<Card title={title} img={img} description={description} links={links} />
	);
}

export default Project;
