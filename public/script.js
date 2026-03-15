const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');

let todos = [];

async function loadTodos() {
	const response = await fetch(API_URL);
	const data = await response.json();

	todos = data.slice(0, 10);
	renderTodos();
}

function renderTodos() {
	todoList.innerHTML = '';

	for (const todo of todos) {
		const li = document.createElement('li');

		li.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})" />
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;

		todoList.appendChild(li);
	}
}

async function addTodo() {
	const title = todoInput.value.trim();

	if (title === '') {
		alert('Please enter a todo');
		return;
	}

	const newTodo = {
		title,
		completed: false,
		userId: 1
	};

	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify(newTodo)
	});

	const createdTodo = await response.json();

	// כי JSONPlaceholder לא שומר באמת, נוסיף ידנית למערך המקומי
	todos.unshift(createdTodo);
	renderTodos();

	todoInput.value = '';
}

async function toggleTodo(id) {
	const todo = todos.find((t) => t.id === id);
	if (!todo) return;

	const updatedTodo = {
		...todo,
		completed: !todo.completed
	};

	await fetch(`${API_URL}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8'
		},
		body: JSON.stringify({
			completed: updatedTodo.completed
		})
	});

	todo.completed = updatedTodo.completed;
	renderTodos();
}

async function deleteTodo(id) {
	await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	});

	// כי המחיקה לא נשמרת באמת בשרת, נסיר לוקלית
	todos = todos.filter((todo) => todo.id !== id);
	renderTodos();
}

addBtn.addEventListener('click', addTodo);

loadTodos();
