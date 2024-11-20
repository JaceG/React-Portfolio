import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../style.css';

function Header() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<header>
			<Navbar key={'sm'} expand={'sm'} className='bg-transparent mb-3'>
				<Container fluid>
					<Navbar.Brand className='text-white'>
						Jace Galloway
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-sm`}
						onClick={handleShow}
					/>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-sm`}
						aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
						placement='end'
						show={show}
						onHide={handleClose}>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title
								id={`offcanvasNavbarLabel-expand-sm`}>
								My Portfolio
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className='justify-content-end flex-grow-1 pe-3'>
								<Nav.Link
									as={Link}
									to='/'
									className='text-md-white'
									onClick={handleClose}>
									About Me
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
}

export default Header;
