import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../style.css';

function Header() {
	return (
		<header>
			<Navbar key={'sm'} expand={'sm'} className='bg-transparent mb-3'>
				<Container fluid>
					<Navbar.Brand className='text-white'>
						Jace Galloway
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls={`offcanvasNavbar-expand-sm`}
					/>
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-sm`}
						aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
						placement='end'>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title
								id={`offcanvasNavbarLabel-expand-sm`}>
								My Portfolio
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className='justify-content-end flex-grow-1 pe-3'>
								<Nav.Link href='/' className='text-md-white'>
									About Me
								</Nav.Link>
								<Nav.Link
									href='/portfolio'
									className='text-md-white'>
									Portfolio
								</Nav.Link>
								<Nav.Link
									href='/contact'
									className='text-md-white'>
									Contact
								</Nav.Link>
								<Nav.Link
									href='/resume'
									className='text-md-white'>
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
