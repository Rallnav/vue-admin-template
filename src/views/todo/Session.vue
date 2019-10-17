<template>

	<el-collapse style="
  border: 0px solid;">
		<el-collapse-item class="session-title">
			<template
				slot="title"
				style="height:auto"
			>
				<span style="margin-left:5%">{{session.startTime}}</span>
			</template>
			<el-row
				:gutter="50"
				class="container"
			>
				<el-col
					class="light-info"
					:span="8"
				>
					<div class="grid-content bg-purple"> 开始时间: {{session.startTime}}</div>
				</el-col>
				<el-col
					class="dark-info"
					:span="8"
				>
					<div class="grid-content bg-purple"> 结束时间: {{session.endTime}}</div>
				</el-col>
				<el-col
					class="light-info"
					:span="8"
				>
					<div class="grid-content bg-purple"> 持续时间: {{formatSeconds(duration)}}</div>
				</el-col>

			</el-row>
			<el-row
				:gutter="50"
				type="flex"
			>
				<el-col
					class="dark-info"
					:span="8"
				>
					<div class="grid-content bg-purple">起始进度: {{session.startProgress}}</div>
				</el-col>
				<el-col
					class="light-info"
					:span="8"
				>
					<div class="grid-content bg-purple">结束进度: {{session.endProgress}}</div>
				</el-col>
				<el-col
					class="dark-info"
					:span="8"
				>
					<div class="grid-content bg-purple">完成进度: {{finishProgress}}</div>
				</el-col>
			</el-row>
			<el-row
				:gutter="50"
				type="flex"
			>
				<el-col
					class="light-info"
					:span="8"
				>
					<div class="grid-content bg-purple">完成速度({{unit}}/小时): {{speed}}</div>
				</el-col>
				<el-col
					class="dark-info"
					:span="8"
				>
					<div class="grid-content bg-purple">完成效率(秒/{{unit}}): {{effecient}}</div>
				</el-col>
				<el-col
					class="light-info"
					:span="8"
				>
					<el-button v-on:click="handleEdit()">
						edit
					</el-button>
				</el-col>
			</el-row>

		</el-collapse-item>

		<el-dialog
			class="edit-dialog"
			width="80%"
			style="top:-12%;"
			append-to-body
			@close="reset()"
			:title="editDialogDisplayTitle"
			:visible.sync="editDialogVisible"
		>
			<el-form
				status-icon
				label-width="125px"
				:model="editSession"
				:rules="rules"
				ref="editForm"
			>
				<el-row style="width:100%;">
					<el-col style="width:40%;">
						<el-form-item prop="id">
							<el-input
								v-model="editSession.id"
								type="hidden"
							></el-input>
						</el-form-item>
						<el-form-item
							label="开始时间："
							prop="startTime"
						>
							<el-input
								v-model="editSession.startTime"
								:disabled="disable"
							></el-input>
						</el-form-item>
						<el-form-item
							label="结束时间："
							prop="endTime"
						>
							<el-input v-model="editSession.endTime"></el-input>
						</el-form-item>
						<el-form-item
							label="起始进度："
							prop="startProgress"
						>
							<el-input v-model="editSession.startProgress"></el-input>
						</el-form-item>
						<el-form-item
							label="完成进度："
							prop="endProgress"
						>
							<el-input v-model="editSession.endProgress"></el-input>
						</el-form-item>
					</el-col>
				</el-row>

			</el-form>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button
					type="info"
					@click="editDialogVisible = false"
				>取消</el-button>
				<el-button
					type="primary"
					:loading="editBtnLoading"
					@click="editSave()"
				>保存</el-button>
			</span>
		</el-dialog>

	</el-collapse>
</template>

<script>
export default {
	name: "session",
	props: ["initSession", "unit"],
	data() {
		return {
			editDialogDisplayTitle: "edit",
			editDialogVisible: false,
			editBtnLoading: false,
			session: this.initSession,
			session: {
				description:
					"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
				id: 1,
				parent: "",
				startTime: new Date(2019, 0, 1),
				endTime: new Date(2019, 0, 2),
				startProgress: 0,
				endProgress: 20
			},
			editSession: {
				description:
					"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
				id: 1,
				parent: "",
				startTime: new Date(),
				endTime: new Date(),
				startProgress: 0,
				endProgress: 20
			},
			disable: false,
			rules: {}
		};
	},
	computed: {
		duration: function() {
			return (this.session.endTime - this.session.startTime) / 1000;
		},
		finishProgress: function() {
			return this.session.endProgress - this.session.startProgress;
		},
		speed: function() {
			return (this.finishProgress / this.duration) * 60 * 60;
		},
		effecient: function() {
			return this.duration / this.finishProgress;
		}
	},
	methods: {
		formatSeconds(value) {
			var secondTime = parseInt(value); // 秒
			var minuteTime = 0; // 分
			var hourTime = 0; // 小时
			if (secondTime > 60) {
				//如果秒数大于60，将秒数转换成整数
				//获取分钟，除以60取整数，得到整数分钟
				minuteTime = parseInt(secondTime / 60);
				//获取秒数，秒数取佘，得到整数秒数
				secondTime = parseInt(secondTime % 60);
				//如果分钟大于60，将分钟转换成小时
				if (minuteTime > 60) {
					//获取小时，获取分钟除以60，得到整数小时
					hourTime = parseInt(minuteTime / 60);
					//获取小时后取佘的分，获取分钟除以60取佘的分
					minuteTime = parseInt(minuteTime % 60);
				}
			}
			var result = "" + parseInt(secondTime) + "秒";

			if (minuteTime > 0 || hourTime > 0) {
				result = "" + parseInt(minuteTime) + "分" + result;
			}
			if (hourTime > 0) {
				result = "" + parseInt(hourTime) + "小时" + result;
			}
			return result;
		},
		handleEdit() {
			this.editDialogDisplayTitle = "edit";
			this.editDialogVisible = true;
			this.editSession = JSON.parse(JSON.stringify(this.session));
		},
		// 表单重置
		reset() {
			let editForm = this.$refs["editForm"];
			editForm.clearValidate();
			editForm.resetFields();
			// @特殊处理, 针对编辑情况的重置
			// for (let k in this.editForm) {
			//   this.editForm[k] = '';
			// }
		},
		editSave() {
			this.session = JSON.parse(JSON.stringify(this.editSession));
			this.$emit("changeData", this.session);
			this.editDialogVisible = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.session-title {
	width: 50%;
	margin: 0 auto;
	border: 1px solid;
	border-radius: 10px 10px 10px 10px;
	background-color: #aaf;
	height: auto;
	overflow: hidden;
}

.light-info {
	align-items: stretch;
	background-color: #e5e9f2;
	text-align: center;
	vertical-align: middle;
}

.dark-info {
	background-color: #d3dce6;
	text-align: center;
	align-self: auto;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1 1 auto;
	.light-info {
		align-items: stretch;
		background-color: #e5e9f2;
		text-align: center;
		vertical-align: middle;
	}
}
</style>
