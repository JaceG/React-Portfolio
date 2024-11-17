import React from 'react';
import { SocialIcon } from 'react-social-icons';

const socialLinks = [
	'https://github.com/JaceG',
	'https://www.linkedin.com/in/jace-galloway-6833a4249',
	'https://stackoverflow.com/users/1450474/jace',
];

function Footer() {
	return (
		<footer>
			<p>© 2024 Jace Galloway</p>
			<p>
				{socialLinks?.map((url) => {
					return <SocialIcon target='_blank' url={url} />;
				})}
			</p>
		</footer>
	);
}

export default Footer;
