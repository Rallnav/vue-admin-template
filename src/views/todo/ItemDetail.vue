<template>
	<el-container>
		<el-button
			circle
			type="danger"
			@click="backToTodo"
			icon="el-icon-refresh-left"
			style="position:fixed"
		></el-button>
		<el-button
			type="text"
			@click="startEdit"
		>编辑项目</el-button>
		<el-dialog
			title="编辑项目"
			:visible.sync="dialogVisible"
			width="80%"
			:before-close="handleClose"
			class="editForm"
		>
			<el-form
				ref="form"
				:model="editItem"
				label-width="80px"
			>
				<div
					class="pic"
					v-if="hasPhoto"
					:key="todoItem.id"
				>
					<el-image
						style="width: 100px; height: 100px"
						:src="require('../../../static/images/' + path)"
						fit="cover"
					></el-image>
				</div>
				<div
					class="wordpic"
					v-else
				>
					{{todoItem.abstract.substring(0,1)}}
				</div>
				<span>图片记录:</span>
				<el-image
					style="width: 100px; height: 100px"
					:src="require('../../../static/images/' + path)"
					fit="cover"
				></el-image>
				<el-upload
					action="/elon-dev/todos/uploadfile/"
					list-type="picture-card"
					:name="todoItem._id.$oid"
					:limit="1"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-success="uploadSuccess"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="previewDialogVisible">
					<img
						width="100%"
						:src="dialogImageUrl"
						alt=""
						:onerror="nofind()"
					>
				</el-dialog>

				<el-form-item label="摘要">
					<el-input
						v-model="editItem.abstract"
						placeholder="请输入内容"
					></el-input>
				</el-form-item>

				<el-form-item label="笔记">
					<el-col>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2}"
							placeholder="请输入内容"
							v-model="editItem.note"
						>
						</el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="任务标签">
					<el-col :span="10">
						<el-input
							v-model="editItem.category"
							placeholder="请输入内容"
							clearable
						></el-input>
					</el-col>
					<el-col :span="5">
						<el-switch
							v-model="editItem.repeated"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-text="非重复任务"
							inactive-text="重复任务"
						>
						</el-switch>
					</el-col>
					<el-col :span="9">
						<el-input-number
							:disabled="editItem.repeated"
							v-model="editItem.repeatSpc"
							@change="handleSpcChange"
							:min="1"
							:max="8"
							label="重复间隔"
						></el-input-number>
					</el-col>
				</el-form-item>

				<el-form-item
					label="进度记录"
					:gutter="20"
				>
					<el-col :span="4">
						起始进度:
						<el-input-number
							v-model="editItem.startProgress"
							controls-position="right"
							label="起始进度"
							:min="1"
							:step="10"
							:max="1000"
						></el-input-number>
					</el-col>
					<el-col
						:span="4"
						:offset="1"
					>
						总进度：
						<el-input-number
							v-model="editItem.totalProgress"
							controls-position="right"
							:min="1"
							:step="10"
							:max="1000"
						></el-input-number>
					</el-col>
					<el-col
						:span="5"
						:offset="1"
					>
						计量单位:
						<el-select
							v-model="editItem.unit"
							placeholder="计量单位"
							filterable
							allow-create
						>
							<el-option
								v-for="option in allUnit"
								:key="option.label"
								:label="option.label"
								:value="option.value"
							>
								<span style="float: left">{{ option.label }}</span>
							</el-option>
						</el-select>
					</el-col>
					<el-col
						:span="5"
						:offset="1"
					>
						<span>
							目标完成时间:
						</span>
						<el-date-picker
							v-model="editItem.endDateGoal"
							type="datetime"
							placeholder="目标完成时间"
							align="right"
							:picker-options="pickerOptions"
							:disabled="editItem.completed"
						>
						</el-date-picker>
					</el-col>
				</el-form-item>

				<el-form-item label="完成状态">
					<el-col :span="2">
						<el-checkbox v-model="editItem.completed">已完成</el-checkbox>
					</el-col>
					<el-col :span="8">
						<span>完成时间:</span>
						<el-date-picker
							v-model="editItem.finishTime"
							type="datetime"
							placeholder="完成时间"
							align="right"
							:picker-options="pickerOptions"
						>
						</el-date-picker>
					</el-col>

					<el-col :span="8">
						<span>提醒时间:</span>
						<el-date-picker
							v-model="editItem.remindTime"
							type="datetime"
							placeholder="提醒时间"
							align="right"
							:picker-options="pickerOptions"
						>
						</el-date-picker>
					</el-col>

				</el-form-item>

				<el-form-item label="完成评语">
					<el-col>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2}"
							placeholder="请输入内容"
							v-model="editItem.comment"
						>
						</el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="项目等级">
					<el-col :span="7">
						<span class="demonstration">难度</span>
						<el-slider
							label="难度"
							v-model="editItem.difficulty"
							:max="10"
						></el-slider>
					</el-col>
					<el-col
						:span="7"
						:offset="1"
					>
						<span class="demonstration">重要性</span>
						<el-slider
							v-model="editItem.importanty"
							:max="10"
						></el-slider>
					</el-col>
					<el-col
						:span="7"
						:offset="1"
					>
						<span class="demonstration">优先级</span>
						<el-slider
							v-model="editItem.priority"
							:max="10"
						></el-slider>
					</el-col>
				</el-form-item>

				<span class="demonstration">已完成进度</span>
				<div class="block">
					<span class="demonstration"></span>
					<el-slider
						v-model="editItem.finishedProgress"
						disabled
					></el-slider>
					<el-progress
						:percentage="100"
						status="success"
					></el-progress>
					<el-progress
						type="circle"
						:percentage="100"
						status="success"
					></el-progress>
				</div>
				<span> 已用时</span>
				<el-input
					placeholder="已用时"
					v-model="editItem.durationSum"
					:disabled="true"
				>
				</el-input>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button
						type="primary"
						@click="onSubmit"
					>确 定</el-button>
				</span>
			</el-form>
		</el-dialog>

		<el-header
			class="item-details"
			type="info"
		>
			<el-row
				type="flex"
				class="row-bg"
			>
				<el-col :span="8">
					<div
						class="pic"
						v-if="hasPhoto"
						:key="todoItem.id"
					><img :src="require('../../../static/images/' + path)"></div>
					<div
						class="wordpic"
						v-else
					>
						{{todoItem.abstract.substring(0,1)}}
					</div>
				</el-col>
				<el-col
					:span="8"
					class="abstract"
				>
					<div class="
						attribute">
						{{todoItem.id}}
					</div>
					<div class="attribute">
						{{todoItem.abstract}}
					</div>
					<div class="attribute">
						{{todoItem.category}}
					</div>
					<div class="attribute">
						{{todoItem.endDateGoal}}
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<el-tooltip
							class="item"
							effect="dark"
							content="难度"
							placement="top"
						>
							<div>
								<span>难度</span>
								<el-rate
									v-model="todoItem.difficulty"
									:icon-classes="difficultyIcon"
									:max="10"
									disabled
									disabled-void-icon-class="el-icon-bell"
									:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
								>
								</el-rate>
							</div>
						</el-tooltip>
						<el-tooltip
							class="item"
							effect="dark"
							content="重要性"
							placement="top"
						>
							<el-rate
								v-model="todoItem.importanty"
								:icon-classes="importantyIcon"
								:max="10"
								disabled
								disabled-void-icon-class="el-icon-s-opportunity"
								:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
							>
							</el-rate>
						</el-tooltip>
						<el-tooltip
							class="item"
							effect="dark"
							content="紧急性"
							placement="top"
						>
							<el-rate
								v-model="todoItem.priority"
								:icon-classes="priorityIcon"
								:max="10"
								disabled
								disabled-void-icon-class="el-icon-s-flag"
								:colors="['#99A9BF', '#F7BA2A', '#FF9900']"
							>
							</el-rate>
						</el-tooltip>
						<div class="attribute">
							{{todoItem.repeat}}
						</div>
						<div class="attribute">
							{{todoItem.remind}}
						</div>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row>
				<el-col :span="24">
					<div
						v-for="(sub, index) in todoItem.subtask"
						:key="index"
						class="attribute"
					>
						<el-col :span="12">
							<el-input
								v-model="sub.text"
								placeholder="请输入内容"
								maxlength="30"
								@keyup.enter.native="editSubTask"
							></el-input>
						</el-col>
						<el-col :span="1">
							<el-checkbox
								v-model="sub.completed"
								@change="editSubTask"
							>完成</el-checkbox>
						</el-col>
						<el-col :span="1">
							<el-button
								@click="deleteSubTask(index)"
								type="danger"
								circle
								icon="el-icon-delete"
							>
							</el-button>
						</el-col>

					</div>
					<el-button
						@click="addSubTask"
						type="success"
						plain
						circle
						icon="el-icon-plus"
					>
					</el-button>
					<div class="attribute">
						{{todoItem.note}}
					</div>
					<div class="attribute">
						{{todoItem.comment}}
					</div>
					<div class="attribute">
						insertTime:"",//插入时间
						finishTime:"",//完成时间
						completed:false,//完成状态
						unit:"页",//进度单位
						finishedProgress:"",//已完成进度
						totalProgress:"",//总进度
						percent:"",//完成进度百分比
						remainProgress:"",//剩余进度
						remainNeedTime:"",//剩余时间
						averageSpeed:"",//平均
						durationSum:"",//总持续时间
					</div>
					<div class="attribute">
						{{todoItem.remind}}
					</div>
				</el-col>
				<el-col :span="24">
					<el-collapse>
						<each-session
							v-for="session in allSessions"
							:key="session.id"
							:unit="todoItem.unit"
							@changeData="editSession"
						>
						</each-session>
					</el-collapse>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>
<script>
import session from "./Session";
import { getTodos, changeStatus } from "@/api/todo";
export default {
	name: "item-details",
	components: {
		"each-session": session
	},
	data() {
		return {
			path: "wallhaven-94967.jpg",
			avatar: require("../../../static/images/wallhaven-94967.jpg"),
			hasPhoto: true,
			dialogVisible: false,
			difficultyIcon: [
				"el-icon-message-solid",
				"el-icon-message-solid",
				"el-icon-message-solid"
			],
			priorityIcon: ["el-icon-s-flag", "el-icon-s-flag", "el-icon-s-flag"],
			importantyIcon: [
				"el-icon-s-opportunity",
				"el-icon-s-opportunity",
				"el-icon-s-opportunity"
			],
			todoItem: {
				_id: {},
				abstract: "",
				category: "",
				unit: "",
				note: "",
				comment: "",
				pic: "",
				completed: false,
				finishTime: "",
				insertTime: "",
				endDateGoal: "",
				remindTime: "",
				difficulty: 0,
				importanty: 0,
				priority: 0,
				repeated: false,
				repeatSpc: 0,
				subtask: [],
				finishedProgress: 0,
				totalProgress: 0,
				durationSum: 0
			},
			editItem: {
				_id: {},
				abstract: "",
				category: "",
				unit: "",
				note: "",
				comment: "",
				pic: "",
				completed: false,
				finishTime: "",
				insertTime: "",
				endDateGoal: "",
				remindTime: "",
				difficulty: 0,
				importanty: 0,
				priority: 0,
				repeated: false,
				repeatSpc: 0,
				subtask: [],
				finishedProgress: 0,
				totalProgress: 0,
				durationSum: 0
			},
			allUnit: [
				{
					value: "页",
					label: "页"
				},
				{
					value: "项",
					label: "项"
				},
				{
					value: "Nanjing",
					label: "南京"
				},
				{
					value: "Chengdu",
					label: "成都"
				},
				{
					value: "Shenzhen",
					label: "深圳"
				},
				{
					value: "Guangzhou",
					label: "广州"
				}
			],
			allSessions: [
				{
					desciption: "一致性 Consistency",
					id: 1,
					parent: "",
					startTime: new Date().toLocaleString(),
					endTime: new Date().toLocaleString(),
					durantion: 20,
					startProgress: 0,
					endProgress: 20,
					finishProgress: 20
				},
				{
					desciption: "一致性 Consistency",
					id: 2,
					parent: "",
					startTime: new Date().toLocaleString(),
					endTime: new Date().toLocaleString(),
					durantion: 20,
					startProgress: 0,
					endProgress: 20,
					finishProgress: 20
				}
			],
			formData: new FormData(),
			dialogImageUrl: "",
			previewDialogVisible: false,
			disabled: false,
			pickerOptions: {
				shortcuts: [
					{
						text: "今天",
						onClick(picker) {
							picker.$emit("pick", new Date());
						}
					},
					{
						text: "昨天",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit("pick", date);
						}
					},
					{
						text: "一周前",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", date);
						}
					}
				]
			},
			value1: "",
			value2: "",
			value3: ""
		};
	},
	computed: {
		hasPhoto: function() {
			return this.todoItem.pic.length > 0;
		}
		// todoItem:function(){
		//     return {
		//         averageSpeed:"",//平均
		//         durationSum:"",//总持续时间
		//     }
		// }
	},
	methods: {
		deleteSubTask(index) {
			this.todoItem.subtask.pop(index);
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { subtask: this.todoItem.subtask }
			});
		},
		editSubTask() {
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { subtask: this.todoItem.subtask }
			});
		},
		addSubTask() {
			this.todoItem.subtask.push({
				text: "",
				completed: false
			});
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { subtask: this.todoItem.subtask }
			});
		},
		editSession() {},
		uploadSuccess(response) {
			this.editItem.pic = response.data;
			console.log(response);
		},
		onSubmit() {
			changeStatus({
				query: { id: this.editItem._id.$oid },
				update: this.editItem
			}).then(response => {
				this.todoItem = JSON.parse(JSON.stringify(this.editItem));
				this.dialogVisible = false;
			});
		},
		handleRemove(file) {
			console.log(file);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.previewDialogVisible = true;
		},
		handleDownload(file) {
			console.log(file);
		},
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		nofind() {
			console.log("failed");
			this.hasPhoto = false;
		},
		startEdit() {
			this.editItem = JSON.parse(JSON.stringify(this.todoItem));
			this.dialogVisible = true;
		},
		finishEdit() {},
		getItem() {
			getTodos({ id: this.$route.params.id }).then(response => {
				this.todoItem = JSON.parse(response.data)[0];
				console.log(this.todoItem);
			});
		},
		backToTodo() {
			// this.$route.push("/lonly/lonly");
			this.$router.push({ path: "/lonly/lonly" });
		},
		handleSpcChange(value) {
			console.log(value);
		}
	},
	mounted() {
		this.getItem();
	}
};
</script>

<style lang="scss" scoped>
$them-color: #ed795a;
.abstract {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: $them-color;
}
.item-details {
	min-height: 260px;
	width: 70%;
	background-color: #ffffff;
	margin: 0 auto;

	//   background:url("~@/../static/images/wallhaven-94967.jpg") center center no-repeat ;
	//   overflow: hidden;
	border-radius: 30px;
	border: 2px solid;
	text-align: center;
	.pic {
		max-width: 185px;
		max-height: 260px;
	}
	.wordpic {
		min-width: 185px;
		height: 260px;
		font-size: 200px;
	}
	// .gather-infos{
	//     position: relative;
	//     top: 50%;
	//     transform: translateY(-50%);
	//     margin: 0 auto
	// }
}
.upload-imgs {
	margin: 10px 0 30px 0;
	overflow: hidden;
	font-size: 0;
}
.upload-imgs li {
	position: relative;
	width: 118px;
	height: 118px;
	font-size: 14px;
	display: inline-block;
	padding: 10px;
	margin-right: 25px;
	border: 2px dashed #ccc;
	text-align: center;
	vertical-align: middle;
}
.upload-imgs li:hover {
	border-color: $them-color;
}
.upload-imgs .add {
	display: block;
	background-color: #ccc;
	color: #ffffff;
	height: 94px;
	padding: 8px 0;
}
.upload-imgs .add .iconfont {
	padding: 10px 0;
	font-size: 40px;
}
.upload-imgs li:hover .add {
	background-color: $them-color;
}
.upload-imgs li .upload {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	max-width: 118px;
	max-height: 118px;
}
.upload-imgs .img {
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 94px;
	max-height: 94px;
	line-height: 94px;
}
.upload-imgs .img img {
	vertical-align: middle;
}
.upload-imgs .img .close {
	display: none;
}
.upload-imgs li:hover .img .close {
	display: block;
	position: absolute;
	right: -6px;
	top: -10px;
	line-height: 1;
	font-size: 22px;
	color: #aaa;
}
img {
	border-style: none;
	width: 100%;
	height: 100%;
}
</style>