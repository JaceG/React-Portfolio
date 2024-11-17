import React from 'react';
import Project from '../components/Project';
import Title from '../components/Title';
import images from '../constants/images';

function Portfolio() {
	const projects = [
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
	];

	return (
		<section>
			<Title title='Portfolio' />
			<div className='row gx-5'>
				{projects.map((project, index) => (
					<Project key={index} {...project} />
				))}
			</div>
		</section>
	);
}

export default Portfolio;
