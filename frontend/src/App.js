import { useContext} from 'react';
import './App.css';
import Start from './Components/Start/Start';

import  {
	UserDataContextProvider,
} from './Context/userData-context';
import GeneralContext from './Context/general-context';
import Task from './Components/Tasks/Task';

const App = () => {
	const generalCtx = useContext(GeneralContext);


	

	return (
		<UserDataContextProvider>
			{!generalCtx.isFinishStart && <Start />}
			{generalCtx.isFinishStart && <Task />}
		</UserDataContextProvider>
	);
};

export default App;
