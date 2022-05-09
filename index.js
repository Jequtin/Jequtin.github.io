//creating database structure
const db = new Dexie('Todo App')
db.version(1).stores({ todos: '++id, todo' })

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");

//tuleeko tähän noi vaan uusiks or wat


//add todo
form.onsubmit = async (event) => {
	event.preventDefault();
	const todo = input.value;
	await db.todos.add({ todo })
	await getTodos()
	form.reset()
};

//display todo
const getTodos = async () => {
	const allTodos = await db.todos.reverse().toArray()
	list_el.innerHTML = allTodos.map(todo => `
	
	<div class="task">
	<div class="content">
	<input id="edit" class="text" readonly="readonly" type="text" value= ${todo.todo}>
	</div>
	<div class="actions">
	<button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
	<button class="edit" onclick="openTodo(event, ${todo.id})">Edit</button>
	</div>
	</div>
	`).join("")

}
window.onload = getTodos

//delete todo
const deleteTodo = async (event, id) => {
	await db.todos.delete(id)
	await getTodos()
}
//edit todo
const openTodo = async (event, id) => {
	location.href = "https://jequtin.github.io/InnerView.html";
	//await getTodos()
}

