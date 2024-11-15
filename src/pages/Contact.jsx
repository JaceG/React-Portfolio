import React, { useState } from 'react';
import Title from '../components/Title';

function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleBlur = (e) => {
		const { name, value } = e.target;
		if (!value)
			setErrors((prev) => ({
				...prev,
				[name]: 'This field is required',
			}));
		else if (name === 'email' && !validateEmail(value))
			setErrors((prev) => ({ ...prev, [name]: 'Invalid email' }));
		else setErrors((prev) => ({ ...prev, [name]: '' }));
	};

	return (
		<section>
			<Title title='Contact' />
			<form>
				{' '}
				<div className='mb-3'>
					{' '}
					<label htmlFor='name' className='form-label'>
						Name:
					</label>{' '}
					<input
						type='text'
						name='name'
						className='form-control'
						value={formData.name}
						onChange={handleChange}
						onBlur={handleBlur}
						id='name'
					/>{' '}
					{errors.name && (
						<div className='text-danger'>{errors.name}</div>
					)}{' '}
				</div>{' '}
				<div className='mb-3'>
					{' '}
					<label htmlFor='email' className='form-label'>
						Email:
					</label>{' '}
					<input
						type='email'
						name='email'
						className='form-control'
						value={formData.email}
						onChange={handleChange}
						onBlur={handleBlur}
						id='email'
					/>{' '}
					{errors.email && (
						<div className='text-danger'>{errors.email}</div>
					)}{' '}
				</div>{' '}
				<div className='mb-3'>
					{' '}
					<label htmlFor='message' className='form-label'>
						Message:
					</label>{' '}
					<textarea
						name='message'
						className='form-control'
						value={formData.message}
						onChange={handleChange}
						onBlur={handleBlur}
						id='message'
						rows='4'
					/>{' '}
					{errors.message && (
						<div className='text-danger'>{errors.message}</div>
					)}{' '}
				</div>{' '}
				<button type='submit' className='btn btn-primary'>
					Send Message
				</button>{' '}
			</form>
		</section>
	);
}

export default Contact;
