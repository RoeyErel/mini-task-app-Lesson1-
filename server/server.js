import express from 'express';

const app = express();

const PORT = 5001;

app.use(express.json());

// request response
app.get('/', (req, res) => {
	res.send('Home Page');
});

// request response
app.get('/test', (req, res) => {
	res.send('Test Page');
});

app.get('/api/todos', (req, res) => {
	res.json(todos);
});

app.post('/api/todos', (req, res) => {
	//Create new Todo
});

app.delete('/api/todos/:id', (req, res) => {
	// delete by id
});

app.listen(PORT, () => {
	console.log('start port:' + PORT);
});
