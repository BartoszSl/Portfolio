import express from 'express';
import cors from 'cors';
import addRequest from './routerAddRequest.js';
import bodyParser from 'body-parser';
import {
	selectAllTask,
	selectLobbyRequest,
	selectTaskToEdit,
} from './routerSelectLobbyTasks.js';
import { deleteTaskById, deleteTasksByManyId } from './routerDeleteTask.js';
import updateTask from './routerUpdateTask.js';
import { selectCategories, selectColors } from './selectStatic.js';

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/', addRequest);
app.use('/', updateTask);

app.get('/select-lobby', selectLobbyRequest);
app.get('/select-task', selectAllTask);
app.get('/select-taskToEdit', selectTaskToEdit);
app.get('/select-colors', selectColors);
app.get('/select-categories', selectCategories);

app.get('/delete-taskById', deleteTaskById);
app.post('/delete-tasksByManyId', deleteTasksByManyId);

app.listen(3001, () => {
	console.log(`Serwer uruchomiony`);
});
