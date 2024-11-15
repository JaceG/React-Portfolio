import Card from 'react-bootstrap/Card';

function CardItem({ title, description, links = [], img }) {
	return (
		<Card style={{ width: '18rem' }}>
			<Card.Body>
				<Card.Img variant='top' src={img} />
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
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
