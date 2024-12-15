import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../style.css';

const Header: React.FC = () => {
	const [show, setShow] = useState<boolean>(false);

	const handleClose = () => setShow(false);

	return (
		<header>
			<Navbar expand='sm' className='bg-transparent mb-3'>
				<Container fluid>
					<Navbar.Brand className='text-white'>
						Jace Galloway
					</Navbar.Brand>

					<Navbar.Offcanvas
						id='offcanvasNavbar-sm'
						aria-labelledby='offcanvasNavbarLabel-sm'
						placement='end'
						show={show}
						onHide={handleClose}>
						<Offcanvas.Body>
							<Nav className='justify-content-end flex-grow-1 pe-3'>
								<Nav.Link
									as={Link}
									to='/'
									className='text-md-white'
									onClick={handleClose}>
									About
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/books'
									className='text-md-white'
									onClick={handleClose}>
									Books
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/portfolio'
									className='text-md-white'
									onClick={handleClose}>
									Portfolio
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/contact'
									className='text-md-white'
									onClick={handleClose}>
									Contact
								</Nav.Link>
								<Nav.Link
									as={Link}
									to='/resume'
									className='text-md-white'
									onClick={handleClose}>
									Resume
								</Nav.Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
