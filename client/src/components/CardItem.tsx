import React from 'react';
import Card from 'react-bootstrap/Card';

interface Link {
	name: string;
	link: string;
	icon?: React.ReactNode;
}

interface CardItemProps {
	title: string;
	description?: string;
	links?: Link[];
	img: string;
}

const CardItem: React.FC<CardItemProps> = ({
	title,
	description,
	links = [],
	img,
	...props
}) => {
	return (
		<Card {...props}>
			<Card.Body>
				<Card.Img className='card-image' variant='top' src={img} />
				<Card.Title className='my-2'>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<div className='my-2'></div>
				{links?.map(({ name, link, icon }, index) => (
					<Card.Link key={index} href={link} target='_blank'>
						{name} {icon ?? null}
					</Card.Link>
				))}
			</Card.Body>
		</Card>
	);
};

export default CardItem;
