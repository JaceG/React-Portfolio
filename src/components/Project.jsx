import React from 'react';
import Card from './CardItem';

function Project({ title, img, links, description }) {
	return (
		<div className='col-md-6 p-2'>
			<Card
				title={title}
				img={img}
				description={description}
				links={links}
			/>
		</div>
	);
}

export default Project;
