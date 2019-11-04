<template>
	<section>
		<el-carousel
			:interval="4000"
			type="card"
			height="200px"
		>
			<el-carousel-item
				v-for="(item,index) in filteredTodos"
				:key="index"
			>
				<!-- <h3 class="medium">{{ item }}</h3> -->
				<div
					class="wordpic"
					:class="{complete:item.completed,uncomplete:!item.completed}"
				>
					{{item.abstract.substring(0,1)}}
				</div>
			</el-carousel-item>
		</el-carousel>
		<header class="todoapp">
			<h1>todos</h1>
			<input
				class="new-todo"
				autofocus
				autocomplete="off"
				placeholder="What needs to be done?"
				v-model="newTodo"
				@keyup.enter="addTodo"
			>
		</header>
		<div
			class="main"
			v-show="todos.length"
			v-cloak
		>
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				v-model="allDone"
			>
			<label for="toggle-all"></label>
			<ul class="todo-list">
				<li
					v-for="(todo, index) in filteredTodos"
					class="todo"
					:key="todo._id.$oid"
					:class="{ completed: todo.completed, editing: todo == editedTodo }"
				>
					<div class="view">
						<input
							class="toggle"
							type="checkbox"
							v-model="todo.completed"
							@change="changeComplete(todo, index)"
						>
						<label @dblclick="editTodo(todo)">{{ todo.abstract }}</label>
						<button
							class="destroy"
							@click="removeTodo(todo)"
						></button>
						<button
							class="moreinfo"
							@click="getMoreInfo(todo)"
						></button>
					</div>
					<input
						class="edit"
						type="text"
						v-model="todo.abstract"
						v-todo-focus="todo == editedTodo"
						@blur="doneEdit(todo)"
						@keyup.enter="doneEdit(todo)"
						@keyup.esc="cancelEdit(todo)"
					>
				</li>
			</ul>
		</div>
		<footer
			class="footer"
			v-show="todos.length"
			v-cloak
		>
			<span class="todo-count">
				<strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
			</span>
			<ul class="filters">
				<li><a
						@click="changeVisibility('all')"
						:class="{ selected: visibility == 'all' }"
					>All</a></li>
				<li><a
						@click="changeVisibility('active')"
						:class="{ selected: visibility == 'active' }"
					>Active</a></li>
				<li><a
						@click="changeVisibility('completed')"
						:class="{ selected: visibility == 'completed' }"
					>Completed</a></li>
			</ul>
			<button
				class="clear-completed"
				@click="removeCompleted"
				v-show="todos.length > remaining"
			>
				Clear completed
			</button>
		</footer>
	</section>
</template>

<script>
import { getTodos, addNewTodo, deleteTodo, changeStatus } from "@/api/todo";
import itemDetail from "./ItemDetail";
// visibility filters
var filtered = {
	all: function(todos) {
		return todos;
	},
	active: function(todos) {
		return todos.filter(function(todo) {
			return !todo.completed;
		});
	},
	completed: function(todos) {
		return todos.filter(function(todo) {
			return todo.completed;
		});
	}
};

// app Vue instance
export default {
	components: {
		itemDetail
	},
	// app initial state
	data() {
		return {
			todos: [],
			newTodo: "",
			editedTodo: null,
			visibility: "all"
		};
	},

	// watch todos change for localStorage persistence
	watch: {
		todos: {
			handler: function(todos) {
				// console.log(todos);
			},
			deep: true
		}
	},

	// computed properties
	// http://vuejs.org/guide/computed.html
	computed: {
		activeTodos: function() {
			return this.todos.filter(function(todo) {
				return !todo.completed;
			});
		},
		filteredTodos: function() {
			// console.log(filters[this.visibility](this.todos));
			return filtered[this.visibility](this.todos);
		},
		remaining: function() {
			return filtered.active(this.todos).length;
		},
		allDone: {
			get: function() {
				return this.remaining === 0;
			},
			set: function(value) {
				this.todos.forEach(function(todo) {
					todo.completed = value;
					changeStatus({
						query: { id: todo._id.$oid },
						update: {
							completed: todo.completed,
							finishTime: todo.completed ? new Date() : ""
						}
					});
				});
			}
		}
	},

	filters: {
		pluralize: function(n) {
			return n === 1 ? "item" : "items";
		}
	},

	// methods that implement data logic.
	// note there's no DOM manipulation here at all.
	methods: {
		changeComplete: function(todo, index) {
			changeStatus({
				query: { id: todo._id.$oid },
				update: {
					completed: todo.completed,
					finishTime: todo.completed ? new Date() : "",
					abstract: todo.abstract
				}
			}).then(response => {
				this.getTodoList();
			});
		},
		addTodo: function() {
			var value = this.newTodo && this.newTodo.trim();
			if (!value) {
				return;
			}
			let newTodoItem = {
				abstract: value,
				completed: false,
				insertTime: new Date()
			};
			addNewTodo(newTodoItem).then(response => {
				this.getTodoList();
			});
			this.newTodo = "";
		},

		removeTodo: function(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			deleteTodo({ id: todo._id.$oid });
		},

		editTodo: function(todo) {
			this.beforeEditCache = todo.abstract;
			this.editedTodo = todo;
		},
		getMoreInfo: function(todo) {
			this.$router.push({ path: "/todoitem/" + todo._id.$oid });
		},
		doneEdit: function(todo) {
			if (!this.editedTodo) {
				return;
			}
			this.editedTodo = null;
			todo.abstract = todo.abstract.trim();
			changeStatus({
				query: { id: todo._id.$oid },
				update: { abstract: todo.abstract }
			});
			if (!todo.abstract) {
				this.removeTodo(todo);
			}
		},

		cancelEdit: function(todo) {
			this.editedTodo = null;
			todo.abstract = this.beforeEditCache;
		},

		removeCompleted: function() {
			this.todos = filters.active(this.todos);
		},
		changeVisibility: function(newVisibility) {
			this.visibility = newVisibility;
		},
		getTodoList: function() {
			getTodos().then(response => {
				this.todos = JSON.parse(response.data);
			});
		}
	},
	mounted() {
		this.getTodoList();
	},

	// a custom directive to wait for the DOM to be updated
	// before focusing on the input field.
	// http://vuejs.org/guide/custom-directive.html
	directives: {
		"todo-focus": function(el, binding) {
			if (binding.value) {
				el.focus();
			}
		}
	}
};

// // mount
// app.$mount('.todoapp')
</script>

<style scoped>
html,
body {
	margin: 0;
	padding: 0;
}

button {
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
	font-size: 100%;
	vertical-align: baseline;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
	-webkit-appearance: none;
	appearance: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
	line-height: 1.4em;
	background: #f5f5f5;
	color: #4d4d4d;
	min-width: 230px;
	max-width: 550px;
	margin: 0 auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-weight: 300;
}

:focus {
	outline: 0;
}

.hidden {
	display: none;
}

.todoapp {
	background: #fff;
	margin: 130px 0 40px 0;
	position: relative;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp input::input-placeholder {
	font-style: italic;
	font-weight: 300;
	color: #e6e6e6;
}

.todoapp h1 {
	position: absolute;
	top: -160px;
	width: 100%;
	font-size: 100px;
	font-weight: 100;
	text-align: center;
	color: rgba(175, 47, 47, 0.15);
	-webkit-text-rendering: optimizeLegibility;
	-moz-text-rendering: optimizeLegibility;
	text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
	position: relative;
	margin: 0;
	width: 100%;
	font-size: 24px;
	font-family: inherit;
	font-weight: inherit;
	line-height: 1.4em;
	color: inherit;
	padding: 6px;
	border: 1px solid #999;
	box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
	box-sizing: border-box;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.new-todo {
	padding: 16px 16px 16px 60px;
	border: none;
	background: rgba(0, 0, 0, 0.003);
	box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
	position: relative;
	z-index: 2;
	border-top: 1px solid #e6e6e6;
}

.toggle-all {
	width: 1px;
	height: 1px;
	border: none; /* Mobile Safari */
	opacity: 0;
	position: absolute;
	right: 100%;
	bottom: 100%;
}

.toggle-all + label {
	width: 60px;
	height: 34px;
	font-size: 0;
	position: absolute;
	top: -95px;
	left: -13px;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}

.toggle-all + label:before {
	content: "❯";
	font-size: 22px;
	color: #e6e6e6;
	padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
	color: #737373;
}

.todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}

.todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
	border-bottom: none;
}

.todo-list li.editing {
	border-bottom: none;
	padding: 0;
}

.todo-list li.editing .edit {
	display: block;
	width: calc(100% - 43px);
	padding: 12px 16px;
	margin: 0 0 0 43px;
}

.todo-list li.editing .view {
	display: none;
}

.todo-list li .toggle {
	text-align: center;
	width: 40px;
	/* auto, since non-WebKit browsers doesn't support input styling */
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}

.todo-list li .toggle {
	opacity: 0;
}

.todo-list li .toggle + label {
	/*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
	background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: center left;
}

.todo-list li .toggle:checked + label {
	background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
	word-break: break-all;
	padding: 15px 15px 15px 60px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}

.todo-list li.completed label {
	color: #d9d9d9;
	text-decoration: line-through;
}

.todo-list li .moreinfo {
	display: none;
	position: absolute;
	top: 0;
	right: 80px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 25px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .moreinfo:hover {
	color: #af5b5e;
}

.todo-list li .moreinfo:after {
	content: "more";
}

.todo-list li:hover .moreinfo {
	display: block;
}

.todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
	color: #af5b5e;
}

.todo-list li .destroy:after {
	content: "×";
}

.todo-list li:hover .destroy {
	display: block;
}

.todo-list li .edit {
	display: none;
}

.todo-list li.editing:last-child {
	margin-bottom: -1px;
}

.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}

.footer:before {
	content: "";
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 50px;
	overflow: hidden;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
		0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
		0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
	float: left;
	text-align: left;
}

.todo-count strong {
	font-weight: 300;
}

.filters {
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	right: 0;
	left: 0;
}

.filters li {
	display: inline;
}

.filters li a {
	color: inherit;
	margin: 3px;
	padding: 3px 7px;
	text-decoration: none;
	border: 1px solid transparent;
	border-radius: 3px;
}

.filters li a:hover {
	border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
	border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
	float: right;
	position: relative;
	line-height: 20px;
	text-decoration: none;
	cursor: pointer;
}

.clear-completed:hover {
	text-decoration: underline;
}

.info {
	margin: 65px auto 0;
	color: #bfbfbf;
	font-size: 10px;
	text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
	text-align: center;
}

.info p {
	line-height: 1;
}

.info a {
	color: inherit;
	text-decoration: none;
	font-weight: 400;
}

.info a:hover {
	text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
	.toggle-all,
	.todo-list li .toggle {
		background: none;
	}

	.todo-list li .toggle {
		height: 40px;
	}
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}
[v-cloak] {
	display: none;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
.wordpic {
	min-width: 185px;
	height: 260px;
	font-size: 200px;
	text-align: center;
}
.wordpic.complete {
	background-color: violet;
}
.wordpic.uncomplete {
	background-color: rgb(183, 250, 0);
}
</style>