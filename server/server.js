import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json()); // middleware

let todos = [
	{ id: 1, text: 'Learn Node.js', completed: false },
	{ id: 2, text: 'Build Todo Server', completed: true }
];

// Home page Route
app.get('/', (req, res) => {
	res.send('Home Page');
});

// Test page Route
app.get('/test', (req, res) => {
	res.send('Test Page');
});

// Get all Todos
app.get('/api/todos', (req, res) => {
	res.json(todos);
});

// Create new todo
app.post('/api/todos', (req, res) => {
	const { text } = req.body;

	if (!text || text.trim() == '') {
		return res.status(400).json({ error: 'Text is required!' });
	}

	const newTodo = {
		id: Date.now(),
		text: text.trim(),
		completed: false
	};

	todos.push(newTodo);
	res.status(201).json(newTodo);
});

// Delete todo by id
app.delete('/api/todos/:id', (req, res) => {
	const todoId = Number(req.params.id);

	todos = todos.filter((todo) => todo.id !== todoId);

	res.json({ message: 'todo deleted successfully' });
});

// Toggle completed
app.patch('/api/todos/:id', (req, res) => {
	const todoId = Number(req.params.id);
	const todo = todos.find((t) => t.id === todoId);

	if (!todo) {
		return res.status(404).json({ error: 'todo not found' });
	}

	todo.completed = !todo.completed;

	res.json(todo);
});

app.listen(process.env.PORT, () => {
	console.log('start port: ' + process.env.PORT);
});
