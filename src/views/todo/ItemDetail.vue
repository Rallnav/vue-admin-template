<template>
	<div class="detail-home">
		<section
			id="operation-button"
			style="position:fixed;left:0px"
		>
			<el-button
				circle
				type="danger"
				@click="backToTodo"
				icon="el-icon-refresh-left"
			></el-button>
			<el-button
				type="primary"
				circle
				icon="el-icon-s-grid"
				@click="startEdit"
			></el-button>
			<el-button
				type="success"
				circle
				icon="el-icon-success"
				@click="finishItem"
			></el-button>
		</section>

		<section
			id="item-attribute"
			class="item-attribute"
		>
			<el-row class="row-bg">
				<el-col style="height:100%;">
					<div
						class="pic"
						v-if="todoItem.pic"
					>
						<el-image
							style="height:100%;"
							fit="fill"
							:src="require('../../../static/images/' + path)"
						>
						</el-image>
					</div>
					<div
						class="wordpic"
						v-else
					>
						{{todoItem.abstract.substring(0,1)}}
					</div>
				</el-col>

				<el-col class="abstract">
					<el-row>
						<el-col :span="20">
							{{todoItem.abstract}}
						</el-col>
						<el-col :span="4">
							<el-tag type="info">{{todoItem.category}}</el-tag>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3">
							总进度:
						</el-col>
						<el-col :span="6">
							{{todoItem.startProgress}} {{todoItem.unit}}
						</el-col>
						<el-col :span="1">
							-
						</el-col>
						<el-col :span="6">
							{{todoItem.totalProgress}}{{todoItem.unit}}
						</el-col>
						<el-col :span="8">
							目标完成时间
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							repeatSpc 重复间隔
						</el-col>
						<el-col :span="8">
							是否提醒
						</el-col>
						<el-col :span="8">
							提醒时间
						</el-col>
					</el-row>
				</el-col>
				<el-col>
					<div class="grid-content bg-purple-light">
						<el-tooltip
							class="item"
							effect="dark"
							content="难度"
							placement="top"
						>
							<div>
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
						<span>
							项目等级雷达图
						</span>
						<!-- <radar
							:id="'exampleId'"
							:style="{width: '100%', height: '150px'}"
							:levels="levels"
						/> -->
					</div>
				</el-col>
			</el-row>
		</section>

		<section
			class="edit-session"
			style="width:90%"
		>
			<el-row>
				<el-col :span="12">
					<el-button
						round
						style="width:90%"
					>
						开始任务
					</el-button>
				</el-col>
				<el-col :span="12">
					<el-button
						round
						style="width:90%"
						@click="showNewSession"
					>
						直接新增任务
					</el-button>
				</el-col>
			</el-row>
		</section>

		<section class="note-part">
			<el-row>
				<el-col
					class="sub-task"
					:span="12"
				>
					<div
						v-for="(sub, index) in todoItem.subtask"
						:key="index"
						class="attribute"
					>
						<el-col :span="22">
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
				</el-col>
				<el-col
					class="note"
					:span="12"
				>
					<el-input
						type="textarea"
						:rows="todoItem.subtask.length*1.9"
						placeholder="请输入笔记内容"
						v-model="todoItem.note"
					>
					</el-input>
					<el-button @click="submitNote">
						提交笔记
					</el-button>
				</el-col>
			</el-row>
		</section>

		<section
			class="prograss-status"
			style="width:90%"
		>
			<el-row>
				<el-col
					class="speed"
					:span="8"
				>
					<span>
						速度1: items/h
						速度2: hours/item
					</span>
				</el-col>
				<el-col
					class="used"
					:span="8"
				>
					<span>
						完成比例
						已用时
						<el-input
							placeholder="已用时"
							v-model="editItem.durationSum"
							:disabled="true"
						>
						</el-input>
					</span>
				</el-col>
				<el-col
					class="time-location"
					:span="8"
				>
					热力图
				</el-col>
			</el-row>
		</section>

		<section
			class="sessions"
			style="width:90%"
		>
			<span>

			</span>
			<el-switch
				v-model="showSession"
				active-color="#13ce66"
				inactive-color="#ff4949"
				active-text="查看完成记录"
			>
			</el-switch>
			<el-collapse v-show="showSession">
				<each-session
					v-for="session in allSessions"
					:key="session.id"
					:unit="todoItem.unit"
					@changeData="editSession"
				>
				</each-session>
			</el-collapse>
		</section>

		<section
			class="comment"
			style="width:90%"
		>
			<el-input
				type="textarea"
				:rows="20"
				placeholder="请输入对本次项目的评价"
				v-model="todoItem.comment"
			>
			</el-input>
			<el-button @click="submitComment">
				提交评价
			</el-button>
		</section>

		<el-drawer
			title="编辑项目"
			:visible.sync="dialogVisible"
			direction="ltr"
			:before-close="handleClose"
			class="editForm"
			size="50%"
			style="height:100vh;"
		>
			<div style="height:93vh;overflow-y: scroll; width:95%;margin-left:5%">
				<el-form
					ref="form"
					:model="editItem"
					label-width="40px"
				>
					上传图片:
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
						>
					</el-dialog>

					<el-form-item label="摘要">
						<el-input
							v-model="editItem.abstract"
							placeholder="请输入内容"
						></el-input>
					</el-form-item>

					<el-form-item label="标签">
						<el-col :span="10">
							<el-input
								v-model="editItem.category"
								placeholder="请输入内容"
								clearable
							></el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="重复">
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
							重复间隔:
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
						label="进度"
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

					</el-form-item>

					<el-form-item label="时间">
						<el-col :span="5">
							<span>
								目标完成时间:
							</span>
							<el-date-picker
								v-model="editItem.endDateGoal"
								type="datetime"
								placeholder="目标完成时间"
								align="right"
								:picker-options="endPickerOptions"
								:disabled="editItem.completed"
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

					<el-form-item label="等级">
						<el-col :span="7">
							<el-col :span="4">
								<span class="demonstration">难度</span>
							</el-col>
							<el-col :span="20">
								<el-slider
									v-model="editItem.difficulty"
									:max="10"
								></el-slider>
							</el-col>
						</el-col>
						<el-col
							:span="7"
							:offset="1"
						>
							<el-col :span="4">
								<span class="demonstration">重要性</span>
							</el-col>
							<el-col :span="20">
								<el-slider
									v-model="editItem.importanty"
									:max="10"
								></el-slider>
							</el-col>
						</el-col>
						<el-col
							:span="7"
							:offset="1"
						>
							<el-col :span="4">
								<span class="demonstration">优先级</span>
							</el-col>
							<el-col :span="20">
								<el-slider
									v-model="editItem.priority"
									:max="10"
								></el-slider>
							</el-col>
						</el-col>
					</el-form-item>
					<span class="dialog-footer">
						<el-button @click="dialogVisible = false">取 消</el-button>
						<el-button
							type="primary"
							@click="onSubmit"
						>确 定</el-button>
					</span>
				</el-form>
			</div>
		</el-drawer>
		<el-dialog
			title="新增记录"
			:visible.sync="newSessionDialog"
			:before-close="handleClose"
			class="newSession"
		>
			<el-form :model="newSession">
				<el-form-item label="本次记录内容简述">
					<el-input v-model="newSession.description"></el-input>
				</el-form-item>
				<el-form-item label="本次记录笔记">
					<el-input v-model="newSession.note"></el-input>
				</el-form-item>
				<el-form-item label="时间记录">
					<el-date-picker
						v-model="newSessionTime"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						align="right"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item lable="进度标记">
					<el-input
						placeholder="请输入本次起始进度"
						v-model.number="newSession.startProgress"
						type="number"
						clearable
					>
					</el-input>
					<el-input
						placeholder="请输入本次结束进度"
						v-model.number="newSession.endProgress"
						type="number"
						clearable
					>
					</el-input>
					<template>
						<el-input-number
							v-model="newSessionProgress"
							label="本次完成进度"
						></el-input-number>
					</template>
				</el-form-item>
				<span class="dialog-footer">
					<el-button @click="newSessionDialog = false">取 消</el-button>
					<el-button
						type="primary"
						@click="newSessionAdd"
					>确 定</el-button>
				</span>
			</el-form>
		</el-dialog>

	</div>
</template>
<script>
import session from "./Session";
import {
	getTodos,
	changeStatus,
	getSession,
	addSession,
	deleteSession,
	editSession
} from "@/api/todo";
import radar from "@/components/Echarts/radar";
export default {
	name: "item-details",
	components: {
		"each-session": session,
		radar
	},
	data() {
		return {
			newSessionDialog: false,
			newSessionTime: "",
			showSession: false,
			path: "wallhaven-94967.jpg",
			avatar: require("../../../static/images/wallhaven-94967.jpg"),
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
				pic: "",
				abstract: "",
				category: "",
				unit: "",
				comment: "",
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
				totalProgress: 1,
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
			newSession: {
				description: "",
				note: "",
				startTime: "",
				endTime: "",
				startProgress: -1,
				endProgress: -1
			},
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
			endPickerOptions: {
				shortcuts: [
					{
						text: "今天",
						onClick(picker) {
							picker.$emit("pick", new Date());
						}
					},
					{
						text: "明天",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24);
							picker.$emit("pick", date);
						}
					},
					{
						text: "一周后",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
							picker.$emit("pick", date);
						}
					}
				]
			}
		};
	},
	computed: {
		newSessionProgress: {
			get() {
				if (
					this.newSession.startProgress >= 0 &&
					this.newSession.endProgress >= 0
				) {
					return this.newSession.endProgress - this.newSession.startProgress;
				} else {
					return 0;
				}
			},
			set(newValue) {
				if (Number(this.newSession.startProgress) >= 0) {
					this.newSession.endProgress =
						Number(this.newSession.startProgress) + Number(newValue);
				} else if (Number(this.newSession.endProgress) >= 0) {
					this.newSession.startProgress =
						Number(this.newSession.endProgress) - Number(newValue);
				}
			}
		},
		finishedPercent: function() {
			if (this.todoItem.totalProgress === 0) {
				return 0;
			} else {
				console.log(
					(this.finishedProgress * 100) / this.todoItem.totalProgress
				);
				return (this.finishedProgress * 100) / this.todoItem.totalProgress;
			}
		},
		levels: function() {
			return [
				this.todoItem.difficulty,
				this.todoItem.importanty,
				this.todoItem.priority
			];
		},
		finishedProgress: function() {
			return this.allSessions[this.allSessions.length - 1].endProgress;
		}
	},
	methods: {
		newSessionAdd() {
			let sess = this.newSession;
			console.log(this.newSessionTime);
			sess.startTime = this.newSessionTime[0];
			sess.endTime = this.newSessionTime[1];
			sess.parent = this.todoItem._id.$oid;
			console.log(sess);
			addSession({
				sess
			}).then(response => {
				this.newSessionDialog = false;
				this.newSession = {
					description: "",
					note: "",
					startTime: "",
					endTime: "",
					startProgress: -1,
					endProgress: -1
				};
			});
		},
		showNewSession() {
			this.newSessionDialog = true;
		},
		submitComment() {
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { comment: this.todoItem.comment }
			});
		},
		finishItem() {
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { completed: true, finishTime: new Date() }
			});
		},
		deleteSubTask(index) {
			this.todoItem.subtask.pop(index);
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { subtask: this.todoItem.subtask }
			});
		},
		submitNote() {
			changeStatus({
				query: { id: this.todoItem._id.$oid },
				update: { note: this.todoItem.note }
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
.detail-home {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.abstract {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.item-attribute {
	height: 260px;
	width: 90%;
	background-color: #ffffff;
	align-items: center;
	margin: 0 auto;
	border-radius: 30px;
	border: 2px solid;
	text-align: center;
	.row-bg {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 90%;
	}
	.pic {
		height: 100%;
		width: 100%;
	}
	.wordpic {
		min-width: 185px;
		height: 260px;
		font-size: 200px;
	}
}

.note-part {
	width: 90%;
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