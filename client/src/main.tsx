import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Books from './pages/Books';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Resume from './pages/Resume';
import Admin from './pages/Admin';
import './style.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Router>
			<div className='portfolio-page-container'>
				<Header />
				<main className='container main-content'>
					<Routes>
						<Route path='/' element={<About />} />
						<Route path='/books' element={<Books />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/portfolio' element={<Portfolio />} />
						<Route path='/resume' element={<Resume />} />
						<Route path='/admin' element={<Admin />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	</React.StrictMode>
);
