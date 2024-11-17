import Card from 'react-bootstrap/Card';

function CardItem({ title, description, links = [], img, ...props }) {
	return (
		<Card {...props}>
			<Card.Body>
				<Card.Img className='card-image' variant='top' src={img} />
				<Card.Title className='my-2'>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<div className='my-2'></div>
				{links?.map(({ name, link, icon }) => (
					<Card.Link href={link} target='_blank'>
						{name} {icon ?? null}
					</Card.Link>
				))}
			</Card.Body>
		</Card>
	);
}

export default CardItem;
