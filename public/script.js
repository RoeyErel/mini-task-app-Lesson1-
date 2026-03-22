const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
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

		span.addEventListener('click', () => {
			todo.completed = !todo.completed;
			saveTodos();
			renderTodos();
		});

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = 'Delete';

		deleteBtn.addEventListener('click', () => {
			todos = todos.filter((t) => t.id !== todo.id);
			saveTodos();
			renderTodos();
		});

		li.appendChild(span);
		li.appendChild(deleteBtn);
		todoList.appendChild(li);
	}
}

function addTodo() {
	const text = todoInput.value.trim();

	if (text === '') {
		alert('Please enter a task');
		return;
	}

	const newTodo = {
		id: Date.now(),
		text: text,
		completed: false
	};

	todos.push(newTodo);
	saveTodos();
	renderTodos();

	todoInput.value = '';
}

addBtn.addEventListener('click', addTodo);

renderTodos();
