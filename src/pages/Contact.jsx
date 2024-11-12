import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) setErrors((prev) => ({ ...prev, [name]: 'This field is required' }));
    else if (name === 'email' && !validateEmail(value)) setErrors((prev) => ({ ...prev, [name]: 'Invalid email' }));
    else setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section>
      <h2>Contact</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} />
          {errors.message && <span className="error">{errors.message}</span>}
        </label>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
