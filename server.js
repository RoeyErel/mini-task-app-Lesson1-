import express from 'express';

const app = express();

const PORT = 5001;

app.use(express.json());

// request response
app.get('/', (req, res) => {
	res.send('Hello from hachana le gius lesson');
});

// request response
app.get('/test', (req, res) => {
	res.send('Hello this is test route');
});

app.listen(PORT, () => {
	console.log('start');
});
