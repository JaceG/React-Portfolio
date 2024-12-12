import React, { useState, ChangeEvent, FormEvent } from 'react';
import Title from '../components/Title';

interface FormData {
	name: string;
	email: string;
	message: string;
}

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

const initialData: FormData = {
	name: '',
	email: '',
	message: '',
};

const Contact: React.FC = () => {
	const [formData, setFormData] = useState<FormData>(initialData);
	const [errors, setErrors] = useState<FormErrors>({});

	const validateEmail = (email: string): boolean =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		handleErrors(name, value);
	};

	const handleErrors = (name: string, value: string): boolean => {
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
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
		return isValid;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formErrors = Object.keys(formData).filter(
			(key) => !handleErrors(key, formData[key as keyof FormData])
		);
		if (formErrors.length === 0) {
			alert('Thanks for reaching out. I will get back to you soon.');
			setFormData(initialData);
		}
	};

	return (
		<section className='resume-container'>
			<div className='contact-container'>
				<Title title='Contact' />
				<form onSubmit={handleSubmit} className='contact-form'>
					<div className='form-group'>
						<label htmlFor='name' className='form-label'>
							Name:
						</label>
						<input
							type='text'
							name='name'
							id='name'
							className='form-input'
							value={formData.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<div className='error-message'>{errors.name}</div>
						)}
					</div>
					<div className='form-group'>
						<label htmlFor='email' className='form-label'>
							Email:
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='form-input'
							value={formData.email}
							onChange={handleChange}
						/>
						{errors.email && (
							<div className='error-message'>{errors.email}</div>
						)}
					</div>
					<div className='form-group'>
						<label htmlFor='message' className='form-label'>
							Message:
						</label>
						<textarea
							name='message'
							id='message'
							className='form-textarea'
							value={formData.message}
							onChange={handleChange}
							rows={4}
						/>
						{errors.message && (
							<div className='error-message'>
								{errors.message}
							</div>
						)}
					</div>
					<button type='submit' className='submit-button'>
						Send Message
					</button>
				</form>
				<div className='contact-info'>
					<h3>Contact Information</h3>
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
			</div>
		</section>
	);
};

export default Contact;
