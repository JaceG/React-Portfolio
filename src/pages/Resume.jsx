import React from 'react';
import Title from '../components/Title';

function Resume() {
	return (
		<section>
			<Title title='Resume' />
			<a href='path/to/resume.pdf' download>
				Download Resume
			</a>
			<ul>
				<li>Proficiency 1</li>
				<li>Proficiency 2</li>
			</ul>
		</section>
	);
}

export default Resume;
