import React from 'react';
import Title from '../components/Title';
function About() {
	return (
		<section>
			<Title title='About Me' />
			<div class='profile-container'>
				<img
					src='../assets/images/me.png'
					alt='Profile Picture'
					class='profile-pic'
				/>
				<p class='first-paragraph'>
					Jace is a newly minted React developer and a recent graduate
					of The Ohio State University's Full Stack Development
					Bootcamp, where they honed their skills in building
					responsive, dynamic web applications with a focus on React.
					Combining a strong foundation in modern JavaScript
					frameworks with a passion for clean, efficient code, Jace
					has cultivated the technical and problem-solving skills
					necessary to excel in the fast-paced world of web
					development. Beyond coding What sets Jace apart is their
					expertise in leveraging advanced AI tools like ChatGPT to
					enhance productivity and innovation from their unique
					interdisciplinary background in communication, psychology,
					biases, and English.
				</p>
			</div>
			<p class='second-paragraph'>
				Jace excels at synthesizing complex requirements into actionable
				solutions, optimizing workflows, and developing creative
				approaches to technical challenges. Eager to bring these diverse
				talents to a collaborative team, Jace is actively exploring
				opportunities in web development, AI, or any roles that benefit
				from their blend of technical skills and analytical insight,
				with a particular interest in the emerging field of prompt
				engineering.
			</p>
		</section>
	);
}

export default About;
