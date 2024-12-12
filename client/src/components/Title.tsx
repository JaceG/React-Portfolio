import React from 'react';

interface TitleProps {
	title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
	return (
		<div className='py-2'>
			<h2>{title}</h2>
			<hr />
		</div>
	);
};

export default Title;
