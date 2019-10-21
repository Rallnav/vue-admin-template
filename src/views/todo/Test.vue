<template>
	<ul class="todo-list">
		<li
			v-for="(todo, index) in filteredTodos"
			class="todo"
			:key="todo.id"
			:class="{ completed: todo.completed, editing: todo == editedTodo }"
		>
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					v-model="todo.completed"
				>
				<label>{{ todo.abstract }}</label>

			</div>
			<input
				class="edit"
				type="text"
				v-model="todo.abstract"
			>
		</li>
	</ul>
</template>

<script>
// visibility filters
var filtered = {
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
export default {
	data() {
		return {
			visibility: "active",
			todos: [
				{
					id: 0,
					abstract: "Todolist",
					completed: false
				},
				{
					id: 1,
					abstract: "Vue",
					completed: false
				},
				{
					id: 2,
					abstract: "Web",
					completed: false
				}
			],
			newTodo: ""
		};
	},
	methods: {},

	computed: {
		filteredTodos: function() {
			return filtered[this.visibility](this.todos);
		}
	}
};
</script>

<style scoped>
[v-cloak] {
	display: none;
}
</style>