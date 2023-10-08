import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GeneralContexProvider } from './Context/general-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<GeneralContexProvider>
		<App />
	</GeneralContexProvider>
);
