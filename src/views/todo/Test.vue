<template>
	<div>
		<el-image
			style="width: 100px; height: 100px"
			:src="require('../../../static/images/' + path)"
			fit="fill"
		>
			<div
				slot="error"
				class="image-slot"
			>
				加载失败了
			</div>
		</el-image>

	</div>
</template>

<script>
export default {
	data() {
		return {
			hasPhoto: true,
			path: "ttt.jpg"
		};
	},
	methods: {},

	computed: {}
};
</script>

<style scoped>
[v-cloak] {
	display: none;
}
</style>