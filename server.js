const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let tasks = [
	{ id: 1, text: 'Learn JavaScript' },
	{ id: 2, text: 'Run app with Docker' }
];

app.get('/api/tasks', (req, res) => {
	res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
	const { text } = req.body;

	if (!text || text.trim() === '') {
		return res.status(400).json({ error: 'Task text is required' });
	}

	const newTask = {
		id: Date.now(),
		text: text.trim()
	};

	tasks.push(newTask);
	res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
	const taskId = Number(req.params.id);
	tasks = tasks.filter((task) => task.id !== taskId);
	res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
