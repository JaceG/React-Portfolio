import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Title from '../components/Title';
import images from '../constants/images';
import '../style.css';

function About() {
	return (
		<section className='resume-container'>
			<Title title='About Me' />
			<div className='profile-container'>
				<img
					src={images.ImgOfMe}
					alt='Profile Picture'
					className='profile-pic'
				/>
				<p className='first-paragraph'>
					<strong>Jace</strong> is a former digital marketer and newly
					minted React developer and a recent graduate of{' '}
					<a
						href='https://eng-bootcamps.osu.edu/coding/'
						target='_blank'
						rel='noopener noreferrer'>
						The Ohio State University's Full Stack Development
						Bootcamp
					</a>
					, where he honed his skills in building responsive, dynamic
					web applications with a focus on React. Combining a strong
					foundation in modern JavaScript frameworks with a passion
					for clean, efficient code, Jace has cultivated the technical
					and problem-solving skills necessary to excel in the
					fast-paced world of web app development. His former
					experience in the world of marketing gives him a unique
					perspective on user behavior and how to create applications
					that not only look great but also provide a seamless user
					experience. He understands that sometimes the needs of the
					marketing team are not always what an engineer would think
					is ideal, and can use this perspective to find solutions
					that are ideal for both marketing goals while not
					sacrificing engineering principles.
				</p>
			</div>
			<div>
				<p className='second-paragraph'>
					Beyond coding, what sets Jace apart is his skills in
					leveraging advanced AI tools like ChatGPT from his{' '}
					<Link to='/books'>unique interdisciplinary background</Link>{' '}
					in subjects such as communication, psychology, and bias.
					Also, advanced English language topics such as linguistics,
					the roots of language, how children learn language, and
					whether or not language is hardwired into the human brain.
					His constant curiosity in researching these subjects
					increases his ability to understand not only user behavior,
					but also how to communicate effectively with AI models.
				</p>
			</div>
			<div>
				<p className='third-paragraph'>
					Jace is eager to bring these diverse talents to a
					collaborative team. He is actively exploring opportunities
					in web development, AI, or any roles that benefit from his
					blend of technical skills and marketing insight, with a
					particular interest in the emerging field of{' '}
					<strong>prompt engineering</strong>. He is prepared to apply
					his new skills to any appropriate project, opportunities, or
					internships, and is excited to contribute to your team's
					success.
				</p>
			</div>
		</section>
	);
}

export default About;
