import React from 'react';
import Project from '../components/Project';
import Title from '../components/Title';
import images from '../constants/images';

function Portfolio() {
	const projects = [
		{
			title: 'Project 1',
			img: images.DiceRoller,
			description: 'Lorem Ipsum',
			links: [
				{
					name: 'App Link',
					link: '',
				},
				{
					name: 'Repo Link',
					link: '',
				},
			],
		},
		{
			title: 'Project 2',
			img: images.DiceRoller,
			description: 'Lorem Ipsum',
			links: [
				{
					name: 'App Link',
					link: '',
				},
				{
					name: 'Repo Link',
					link: '',
				},
			],
		},
	];

	return (
		<section>
			<Title title='Portfolio' />
			<div className='projects'>
				{projects.map((project, index) => (
					<Project key={index} {...project} />
				))}
			</div>
		</section>
	);
}

export default Portfolio;
