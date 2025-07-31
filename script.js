// Select elements
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

// Add task function
function addTask() {
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement('li');
  li.textContent = task;

  // Toggle done
  li.addEventListener('click', () => {
    li.classList.toggle('done');
  });

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = "X";
  delBtn.classList.add('delete');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents triggering the li click
    list.removeChild(li);
  });

  li.appendChild(delBtn);
  list.appendChild(li);

  input.value = "";
}

// Event listener for the button
addBtn.addEventListener('click', addTask);

// Optional: Press "Enter" to add task
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});
