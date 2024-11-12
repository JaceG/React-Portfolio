import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import './style.css';

function MainApp() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<About />} />
					<Route path='/portfolio' element={<Portfolio />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/resume' element={<Resume />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<MainApp />
	</Router>
);
