import React from 'react';

function Footer() {
	return (
		<footer>
			<p>© 2024 Jace Galloway</p>
			<p>
				<a
					href='https://github.com/username'
					target='_blank'
					rel='noopener noreferrer'>
					GitHub
				</a>{' '}
				|
				<a
					href='https://linkedin.com/in/username'
					target='_blank'
					rel='noopener noreferrer'>
					LinkedIn
				</a>{' '}
				|
				<a
					href='https://stackoverflow.com/users/username'
					target='_blank'
					rel='noopener noreferrer'>
					Stack Overflow
				</a>
			</p>
		</footer>
	);
}

export default Footer;
