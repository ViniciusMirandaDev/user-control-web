import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<CustomProvider theme="dark">
			<App />
		</CustomProvider>
	</React.StrictMode>
);
