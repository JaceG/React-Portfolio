import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	assetsInclude: [
		'**/*.png',
		'**/*.jpg',
		'**/*.jpeg',
		'**/*.gif',
		'**/*.svg',
		'**/*.pdf',
	],
	build: {
		rollupOptions: {
			input: {
				main: './index.html',
			},
		},
	},
	define: {
		'import.meta.env.VITE_API_URL': JSON.stringify(
			process.env.NODE_ENV === 'production'
				? 'https://react-portfolio-7z0l.onrender.com/api'
				: 'http://localhost:3001/api'
		),
	},
});
