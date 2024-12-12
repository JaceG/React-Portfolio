import React from 'react';

interface Link {
	name: string;
	link: string;
}

interface ProjectProps {
	title: string;
	img: string;
	links: Link[];
	description?: string;
}

const Project: React.FC<ProjectProps> = ({
	title,
	img,
	links,
	description,
}) => {
	return (
		<div className='project'>
			<img src={img} alt={title} />
			<h3>{title}</h3>
			{description && <p>{description}</p>}
			<div className='project-links'>
				{links.map((link, index) => (
					<a
						key={index}
						href={link.link}
						target='_blank'
						rel='noopener noreferrer'>
						{link.name}
					</a>
				))}
			</div>
		</div>
	);
};

export default Project;
