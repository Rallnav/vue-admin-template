<template>
	<el-container title="任务详细信息">
		<el-button
			type="text"
			@click="startEdit"
		>编辑项目</el-button>
		<el-dialog
			title="编辑项目"
			:visible.sync="dialogVisible"
			width="50%"
			:before-close="handleClose"
			class="editForm"
		>
			<span>摘要:</span>
			<el-input
				v-model="editItem.abstract"
				placeholder="请输入内容"
			></el-input>
			<span>分类:</span>
			<el-input
				v-model="editItem.category"
				placeholder="请输入内容"
			></el-input>
			<span>这是一段信息</span>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button
					type="primary"
					@click="dialogVisible = false"
				>确 定</el-button>
			</span>
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
					><img
							:src="todoItem.pic"
							:οnerrοr="nofind()"
						></div>
					<div
						class="wordpic"
						v-else
					>
						{{todoItem.abstract.substring(0,1)}}
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<div class="attribute">
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
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<div class="attribute">
							{{todoItem.difficulty}}
						</div>
						<div class="attribute">
							{{todoItem.importanty}}
						</div>
						<div class="attribute">
							{{todoItem.priority}}
						</div>
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
					<div class="attribute">
						{{todoItem.subtask}}
					</div>
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
import { getTodos } from "@/api/todo";
export default {
	name: "item-details",
	components: {
		"each-session": session
	},
	data() {
		return {
			hasPhoto: true,
			dialogVisible: false,
			todoItem: {
				abstract: ""
			},
			editItem: {},
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
				}
			]
		};
	},
	computed: {
		// todoItem:function(){
		//     return {
		//         averageSpeed:"",//平均
		//         durationSum:"",//总持续时间
		//     }
		// }
	},
	methods: {
		handleClose(done) {
			this.$confirm("确认关闭？")
				.then(_ => {
					done();
				})
				.catch(_ => {});
		},
		nofind() {
			this.hasPhoto = false;
		},
		startEdit() {
			this.editItem = JSON.parse(JSON.stringify(this.todoItem));
			this.dialogVisible = true;
		},
		editItem() {},
		getItem() {
			getTodos({ id: this.$route.params.id }).then(response => {
				this.todoItem = JSON.parse(response.data)[0];
				console.log(this.todoItem);
			});
		}
	},
	mounted() {
		this.getItem();
	}
};
</script>

<style lang="scss" scoped>
.item-details {
	min-height: 260px;
	width: 70%;
	background-color: #ffffff;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
</style>