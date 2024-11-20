import React from 'react';
import Title from '../components/Title';
import '../style.css';

function Resume() {
	return (
		<section className='resume-container'>
			<Title title='Resume' />
			<a href='path/to/resume.pdf' className='download-link' download>
				Download Resume
			</a>

			<section className='resume-section'>
				<div className='mt-4'>
					<h5>Contact Information</h5>
					<p>
						Email:{' '}
						<a href='mailto:jace.galloway@gmail.com'>
							jace.galloway@gmail.com
						</a>
					</p>
					<p>
						Phone: <a href='tel:+16193002902'>(619) 300-2902</a>
					</p>
				</div>
				<h2 className='section-title'>Jace Galloway</h2>
				<p className='summary-text'>
					I am looking to build a career in Full Stack React Web
					Development. My skills for this field are listed in detail
					at the bottom of my resume. I have recently graduated from
					The Ohio State University Full Stack React Bootcamp in order
					to switch careers. Over the years, I have gained diverse
					experience in various roles that can be leveraged in this
					endeavor and give me a unique approach that adds immense
					cross-disciplinary value.
				</p>
				<p>
					I started as a Quality Assurance Analyst, ensuring the
					quality of the MLB The Show video game franchise. I then
					moved into a Marketing role, where I honed my skills in
					marketing strategies and implementation. My experience as a
					Driver and an Insurance Broker has enhanced my communication
					and problem-solving skills. I am now eager to leverage my
					comprehensive skill set in a Full Stack React Web
					Development role.
				</p>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Work Experience</h2>
				<ul className='work-experience-list'>
					<li className='work-item'>
						<h3 className='job-title'>Insurance Broker</h3>
						<p>
							<strong>Independent</strong> –{' '}
							<em>Tampa, Florida</em>
						</p>
					</li>
					<li className='work-item'>
						<h3 className='job-title'>Driver</h3>
						<p>
							<strong>Uber & Lyft</strong> –{' '}
							<em>San Diego, California</em>, /{' '}
							<em>Tampa, Florida</em>, / <em>Columbus, Ohio</em>
						</p>
					</li>
					<li className='work-item'>
						<h3 className='job-title'>Marketing Manager</h3>
						<p>
							<strong>ADventures</strong> –{' '}
							<em>San Diego, California</em>
						</p>
					</li>
					<li className='work-item'>
						<h3 className='job-title'>
							Marketing & Data Entry Specialist
						</h3>
						<p>
							<strong>Fix Your Funnel</strong> –{' '}
							<em>San Diego, California</em>
						</p>
					</li>
					<li className='work-item'>
						<h3 className='job-title'>Quality Assurance Analyst</h3>
						<p>
							<strong>Sony</strong> –{' '}
							<em>San Diego, California</em>
						</p>
					</li>
				</ul>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Education</h2>
				<ul className='education-list'>
					<li className='education-item'>
						<h3 className='degree'>
							Full Stack React Web Development Bootcamp
							Certification
						</h3>
						<p>
							<strong>The Ohio State University</strong> –{' '}
							<em>Columbus, Ohio</em>
						</p>
					</li>
					<li className='education-item'>
						<h3 className='degree'>
							Digital Marketing Certification
						</h3>
						<p>
							<strong>Thinkful</strong> – <em>Online</em>
						</p>
					</li>
				</ul>
			</section>

			<section className='resume-section'>
				<h2 className='section-title'>Skills</h2>
				<h3 className='small-title'>Frontend Development Skills:</h3>
				<ul className='skills-list'>
					<li>HTML</li>
					<li>CSS</li>
					<li>JavaScript</li>
					<li>React</li>
					<li>TypeScript</li>
					<li>Wireframing</li>
				</ul>

				<h3 className='small-title'>Backend Development Skills:</h3>
				<ul className='skills-list'>
					<li>Node.js</li>
					<li>Object-Oriented Programming</li>
					<li>Servers</li>
					<li>APIs</li>
					<li>Python</li>
				</ul>

				<h3 className='small-title'>Database Skills:</h3>
				<ul className='skills-list'>
					<li>PostgreSQL</li>
					<li>MongoDB</li>
					<li>MERN</li>
				</ul>

				<h3 className='small-title'>Tools and Technologies:</h3>
				<ul className='skills-list'>
					<li>Git</li>
					<li>Postman</li>
					<li>CI/CD</li>
					<li>Deployment</li>
				</ul>

				<h3 className='small-title'>Other Skills:</h3>
				<ul className='skills-list'>
					<li>ChatGPT</li>
					<li>Copilot</li>
					<li>Testing</li>
					<li>Refactoring</li>
					<li>Prompt Engineering</li>
				</ul>
			</section>
		</section>
	);
}

export default Resume;
