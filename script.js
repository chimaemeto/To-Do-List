// Get DOM elements
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filter = document.getElementById('filter');

// Load from local storage
document.addEventListener('DOMContentLoaded', loadTodos);

// Add task
addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    const task = createTaskElement(taskText);
    todoList.appendChild(task);
    saveTodo(taskText);
    input.value = '';
  }
});

// Filter tasks
filter.addEventListener('change', () => {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (filter.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');
        break;
      case 'uncompleted':
        !todo.classList.contains('completed')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none');
        break;
    }
  });
});

// Helpers

function createTaskElement(text) {
  const li = document.createElement('li');
  li.classList.add('todo');

  li.innerHTML = `
    <span class="task-text">${text}</span>
    <button class="complete-btn">✔</button>
    <button class="delete-btn">🗑</button>
  `;

  // Complete task
  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalTodos();
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.classList.add('fall');
    li.addEventListener('transitionend', () => {
      li.remove();
      removeTodo(text);
    });
  });

  return li;
}

function saveTodo(text) {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos() {
  const items = todoList.querySelectorAll('.todo');
  const todos = [...items].map(item => ({
    text: item.querySelector('.task-text').textContent,
    completed: item.classList.contains('completed')
  }));
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodo(text) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.text !== text);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach(({ text, completed }) => {
    const task = createTaskElement(text);
    if (completed) task.classList.add('completed');
    todoList.appendChild(task);
  });
}
