import React from 'react';
import Project from '../components/Project';
import Title from '../components/Title';
import images from '../constants/images';

interface ProjectData {
	title: string;
	img: string;
	links: { name: string; link: string }[];
	description?: string;
}

const Portfolio: React.FC = () => {
	const projects: ProjectData[] = [
		{
			title: 'Random Movie Generator',
			img: images.PickFlick,
			links: [
				{
					name: 'App Link',
					link: 'https://www.pickflick.app',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Pick-Flick',
				},
			],
		},
		{
			title: 'Kanban Board',
			img: images.KanbanBoard,
			description: 'takes a minute to load!',
			links: [
				{
					name: 'App Link',
					link: 'https://kanban-board-2dzw.onrender.com/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Kanban-Board',
				},
			],
		},
		{
			title: 'Piano Player',
			img: images.PianoPlayer,
			links: [
				{
					name: 'App Link',
					link: 'https://apgash.github.io/Piano-Project/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/Apgash/Piano-Project',
				},
			],
		},
		{
			title: 'Weather Dashboard',
			img: images.WeatherDashboard,
			description: 'takes a minute to load!',
			links: [
				{
					name: 'App Link',
					link: 'https://weather-dashboard-g7bd.onrender.com/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Weather-Dashboard',
				},
			],
		},
		{
			title: 'CSS Cheatsheet',
			img: images.CssCheatsheet,
			links: [
				{
					name: 'App Link',
					link: 'https://jaceg.github.io/CSS-Snippet-Cheatsheet-Mini-Project-Clone/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/CSS-Snippet-Cheatsheet-Mini-Project-Clone',
				},
			],
		},
		{
			title: 'Dice Roller',
			img: images.DiceRoller,
			links: [
				{
					name: 'App Link',
					link: 'https://jaceg.github.io/Dice-Roller-Program/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Dice-Roller-Program',
				},
			],
		},
		{
			title: 'Employee Tracker',
			img: images.EmployeeTracker,
			links: [
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Employee-Tracker',
				},
			],
		},
		{
			title: 'Random Password Generator',
			img: images.RandomPasswordGenerator,
			links: [
				{
					name: 'App Link',
					link: 'https://jaceg.github.io/Random-Password-Generator/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Random-Password-Generator',
				},
			],
		},
		{
			title: 'Readme Generator',
			img: images.ReadmeGenerator,
			links: [
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Readme-Generator',
				},
			],
		},
		{
			title: 'Rock Paper Scissors Game',
			img: images.RpsGame,
			links: [
				{
					name: 'App Link',
					link: 'https://jaceg.github.io/Rock-Paper-Scissors-Mini-Project-Clone/',
				},
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/Rock-Paper-Scissors-Mini-Project-Clone',
				},
			],
		},
		{
			title: 'Vehicle Builder',
			img: images.VehicleBuilder,
			links: [
				{
					name: 'Repo Link',
					link: 'https://github.com/JaceG/New-Vehicle-Generator',
				},
			],
		},
	];

	return (
		<section className='resume-container'>
			<div className='portfolio-container'>
				<Title title='Portfolio' />
				<div className='projects-grid'>
					{projects.map((project, index) => (
						<Project key={index} {...project} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Portfolio;
