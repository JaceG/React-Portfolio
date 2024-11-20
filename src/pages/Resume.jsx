import React from 'react';
import Title from '../components/Title';

function Resume() {
	return (
		<section className='resume-container'>
			<Title title='Resume' />
			<a href='path/to/resume.pdf' className='download-link' download>
				Download Resume
			</a>

			<section className='resume-section'>
				<h2 className='section-title'>Summary</h2>
				<p className='summary-text'>
					A concise summary of your skills, experience, and career
					goals. For example: "Recent graduate from The Ohio State
					University Full Stack Development Bootcamp with a focus on
					React and expertise in communication and problem-solving."
				</p>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Work Experience</h2>
				<ul className='work-experience-list'>
					<li className='work-item'>
						<h3 className='job-title'>Job Title</h3>
						<p>
							<strong>Company Name</strong> – <em>City, State</em>
						</p>
						<p>MM/YYYY – MM/YYYY</p>
						<ul className='job-responsibilities'>
							<li>Responsibility or achievement 1</li>
							<li>Responsibility or achievement 2</li>
							<li>Responsibility or achievement 3</li>
						</ul>
					</li>
				</ul>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Education</h2>
				<ul className='education-list'>
					<li className='education-item'>
						<h3 className='degree'>Degree</h3>
						<p>
							<strong>School Name</strong> – <em>City, State</em>
						</p>
						<p>MM/YYYY – MM/YYYY</p>
					</li>
				</ul>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Skills</h2>
				<ul className='skills-list'>
					<li>Skill 1</li>
					<li>Skill 2</li>
					<li>Skill 3</li>
					<li>Skill 4</li>
				</ul>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Projects</h2>
				<ul className='projects-list'>
					<li className='project-item'>
						<h3 className='project-name'>Project Name</h3>
						<p>
							<strong>Technologies Used:</strong> Technology 1,
							Technology 2
						</p>
						<p>Description of the project.</p>
					</li>
				</ul>
			</section>
		</section>
	);
}

export default Resume;
