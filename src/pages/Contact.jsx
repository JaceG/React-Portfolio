import React, { useState } from 'react';
import Title from '../components/Title';

const initialData = {
	name: '',
	email: '',
	message: '',
};

function Contact() {
	const [formData, setFormData] = useState({
		...initialData,
	});
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		handleErrors(e.target.name, e.target.value);
	};

	const handleErrors = (name, value) => {
		let isValid = true;
		if (!value) {
			setErrors((prev) => ({
				...prev,
				[name]: 'This field is required',
			}));
			isValid = false;
		} else if (name === 'email' && !validateEmail(value)) {
			setErrors((prev) => ({ ...prev, [name]: 'Invalid email' }));
			isValid = false;
		} else {
			setErrors((prev) => ({ ...prev, [name]: '' }));
			isValid = true;
		}
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const names = Object.keys(formData);
		const formErrors = names.filter(
			(name) => !handleErrors(name, formData[name])
		);
		if (formErrors.length === 0) {
			alert('Thanks for reaching out. I will get back to you soon.');
			setFormData({ ...initialData });
		}
	};

	return (
		<section>
			<Title title='Contact' />
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label htmlFor='name' className='form-label'>
						Name:
					</label>
					<input
						type='text'
						name='name'
						className='form-control'
						value={formData.name}
						onChange={handleChange}
						id='name'
					/>
					{errors.name && (
						<div className='text-danger'>{errors.name}</div>
					)}
				</div>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email:
					</label>
					<input
						type='email'
						name='email'
						className='form-control'
						value={formData.email}
						onChange={handleChange}
						id='email'
					/>
					{errors.email && (
						<div className='text-danger'>{errors.email}</div>
					)}
				</div>
				<div className='mb-3'>
					<label htmlFor='message' className='form-label'>
						Message:
					</label>
					<textarea
						name='message'
						className='form-control'
						value={formData.message}
						onChange={handleChange}
						id='message'
						rows='4'
					/>
					{errors.message && (
						<div className='text-danger'>{errors.message}</div>
					)}
				</div>
				<button type='submit' className='btn btn-primary'>
					Send Message
				</button>
			</form>
			<div className='mt-4'>
				<h5>Contact Information</h5>
				<p>
					Email:{' '}
					<a href='mailto:jace.galloway@gmail.com'>
						jace.galloway@gmail.com
					</a>
				</p>
				<p>
					Phone: <a href='tel:+16193002902'>(619) 300-2902</a>
				</p>
			</div>
		</section>
	);
}

export default Contact;
