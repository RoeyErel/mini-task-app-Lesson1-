const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = [];

async function loadTodos() {
	const response = await fetch('http://localhost:5001/api/todos');
	todos = await response.json();
	renderTodos();
}

function renderTodos() {
	todoList.innerHTML = '';

	for (const todo of todos) {
		const li = document.createElement('li');

		const span = document.createElement('span');
		span.textContent = todo.text;

		if (todo.completed) {
			span.classList.add('done');
		}

		span.addEventListener('click', async () => {
			await fetch(`http://localhost:5001/api/todos/${todo.id}`, {
				method: 'PATCH'
			});

			loadTodos();
		});

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';

		deleteBtn.addEventListener('click', async () => {
			await fetch(`http://localhost:5001/api/todos/${todo.id}`, {
				method: 'DELETE'
			});

			loadTodos();
		});

		li.appendChild(span);
		li.appendChild(deleteBtn);
		todoList.appendChild(li);
	}
}

async function addTodo() {
	const text = todoInput.value.trim();

	if (text === '') {
		alert('Please enter a task');
		return;
	}

	await fetch('http://localhost:5001/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text })
	});

	todoInput.value = '';
	loadTodos();
}

addBtn.addEventListener('click', addTodo);

loadTodos();
