<template>
	<el-container title="任务详细信息">
		<el-button
			type="danger"
			@click="backToTodo"
		>backToTodos</el-button>
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
			<el-form
				ref="form"
				:model="editItem"
				label-width="80px"
			>
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
				<div class="form-group">
					<label class="control-label">上传图片</label>
					<div class="control-form">
						<p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)</p>
						<ul class="upload-imgs">
							<li v-if="imgLen>=4 ? false : true">
								<input
									type="file"
									class="upload"
									@change="addImg"
									ref="inputer"
									multiple
									accept="image/png,image/jpeg,image/gif,image/jpg"
								/>
								<a class="add"><i class="iconfont icon-plus"></i>
									<p>点击上传</p>
								</a>
							</li>
							<li
								v-for='(value, key) in imgs'
								:key="key"
							>
								<div class="img"><img :src="getObjectURL(value)"><a
										class="close"
										@click="delImg(key)"
									>×</a></div>
							</li>
						</ul>
					</div>
				</div>
				<span>摘要:</span>
				<el-input
					v-model="editItem.abstract"
					placeholder="请输入内容"
				></el-input>
				<span>分类:</span>
				<el-input
					v-model="editItem.category"
					placeholder="请输入内容"
					clearable
				></el-input>
				<span>总进度</span>
				<el-input-number
					v-model="editItem.totalProgress"
					controls-position="right"
					@change="handleChange"
					:min="1"
					:max="1000"
				></el-input-number>
				<span>图片记录:</span>
				<el-input
					v-model="editItem.pic"
					placeholder="请输入内容"
					clearable
				></el-input>
				<span>计量单位:</span>
				<el-input
					v-model="editItem.unit"
					placeholder="请输入内容"
					clearable
				></el-input>
				<span>完成时间:</span>
				<el-date-picker
					v-model="editItem.finishTime"
					type="datetime"
					placeholder="完成时间"
					align="right"
					:picker-options="pickerOptions"
				>
				</el-date-picker>
				<span>目标完成时间:</span>
				<el-date-picker
					v-model="editItem.endDateGoal"
					type="datetime"
					placeholder="目标完成时间"
					align="right"
					:picker-options="pickerOptions"
				>
				</el-date-picker>
				<span>提醒时间:</span>
				<el-date-picker
					v-model="editItem.remindTime"
					type="datetime"
					placeholder="提醒时间"
					align="right"
					:picker-options="pickerOptions"
				>
				</el-date-picker>
				<span>已完成:</span>
				<el-radio
					v-model="editItem.completed"
					label="已完成"
				>已完成</el-radio>
				<span>标记为重复任务:</span>
				<el-switch
					v-model="editItem.repeated"
					active-color="#13ce66"
					inactive-color="#ff4949"
				>
				</el-switch>

				<span>重复间隔:</span>
				<el-input-number
					v-model="editItem.repeatSpc"
					@change="handleChange"
					:min="1"
					:max="8"
					label="重复间隔"
				></el-input-number>
				<span class="demonstration">难度</span>
				<el-slider v-model="editItem.difficulty"></el-slider>
				<span class="demonstration">重要性</span>
				<el-slider v-model="editItem.importanty"></el-slider>
				<span class="demonstration">优先级</span>
				<el-slider v-model="editItem.priority"></el-slider>
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
			],
			formData: new FormData(),
			imgs: {},
			imgLen: 0
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
		addImg(event) {
			let inputDOM = this.$refs.inputer;
			// 通过DOM取文件数据
			this.fil = inputDOM.files;
			let oldLen = this.imgLen;
			let len = this.fil.length + oldLen;
			if (len > 4) {
				alert("最多可上传4张，您还可以上传" + (4 - oldLen) + "张");
				return false;
			}
			for (let i = 0; i < this.fil.length; i++) {
				let size = Math.floor(this.fil[i].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert("请选择5M以内的图片！");
					return false;
				}
				this.imgLen++;
				this.$set(
					this.imgs,
					this.fil[i].name + "?" + new Date().getTime() + i,
					this.fil[i]
				);
			}
		},
		getObjectURL(file) {
			var url = null;
			if (window.createObjectURL != undefined) {
				// basic
				url = window.createObjectURL(file);
			} else if (window.URL != undefined) {
				// mozilla(firefox)
				url = window.URL.createObjectURL(file);
			} else if (window.webkitURL != undefined) {
				// webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			}
			return url;
		},
		delImg(key) {
			this.$delete(this.imgs, key);
			this.imgLen--;
		},
		submit() {
			for (let key in this.imgs) {
				let name = key.split("?")[0];
				this.formData.append("multipartFiles", this.imgs[key], name);
			}
			this.$http
				.post("/opinion/feedback", this.formData, {
					headers: { "Content-Type": "multipart/form-data" }
				})
				.then(res => {
					this.alertShow = true;
				});
		},
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
		}
	},
	mounted() {
		this.getItem();
	}
};
</script>

<style lang="scss" scoped>
$them-color: #ed795a;
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