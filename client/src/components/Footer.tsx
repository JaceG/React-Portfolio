import React from 'react';
import { SocialIcon } from 'react-social-icons';

interface SocialLink {
	url: string;
	label: string;
	style?: React.CSSProperties;
}

const Footer: React.FC = () => {
	const socialLinks: SocialLink[] = [
		{
			url: 'https://github.com/JaceG',
			label: 'GitHub',
			style: { filter: 'invert(1)' },
		},
		{
			url: 'https://linkedin.com/in/jace-galloway-6833a4249',
			label: 'LinkedIn',
		},
		{ url: 'https://stackoverflow.com/', label: 'StackOverflow' },
	];

	return (
		<footer
			style={{
				backgroundColor: '#333',
				color: '#fff',
				padding: '20px 0',
				textAlign: 'center',
			}}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<div style={{ marginBottom: '10px' }}>
					&copy; 2024 Jace Galloway
				</div>
				<div style={{ display: 'flex', gap: '10px' }}>
					{socialLinks.map((link, index) => (
						<SocialIcon
							key={link.label + index}
							url={link.url}
							target='_blank'
							rel='noopener noreferrer'
							style={{
								height: 60,
								width: 60,
								...(link.style || {}),
							}}
						/>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
