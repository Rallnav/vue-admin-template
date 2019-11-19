<template>
	<el-form :model="session">

		<el-form-item
			label="计时器"
			v-if="realTime"
		>
			<time-count :autoStart="true">
			</time-count>
		</el-form-item>
		<el-form-item label="本次记录内容简述">
			<el-input v-model="description"></el-input>
		</el-form-item>
		<el-form-item label="本次记录笔记">
			<el-input v-model="note"></el-input>
		</el-form-item>
		<el-form-item label="时间记录">
			<el-date-picker
				v-model="sessionTime"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				align="right"
			>
			</el-date-picker>
		</el-form-item>
		<el-form-item label="持续时间">
			<el-row>
				<el-col :span="3">
					<el-input v-model="day">
					</el-input>
				</el-col>
				<el-col :span="2">
					day
				</el-col>
				<el-col :span="3">
					<el-input v-model="hour">
					</el-input>
				</el-col>
				<el-col :span="1">
					:
				</el-col>
				<el-col :span="3">
					<el-input v-model="minute">
					</el-input>
				</el-col>
				<el-col :span="1">
					:
				</el-col>
				<el-col :span="3">
					<el-input v-model="second">
					</el-input>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item label="进度标记">
			<el-row>
				<el-col :span="7">
					<el-input
						placeholder="请输入本次起始进度"
						v-model.number="startProgress"
						type="number"
						clearable
					/>
				</el-col>
				<el-col :span="7">
					<el-input
						placeholder="请输入本次结束进度"
						v-model.number="endProgress"
						type="number"
						clearable
					/>
				</el-col>
				<el-col :span="7">
					<el-input-number
						v-model="finishedProgress"
						label="本次完成进度"
					/>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item lable="进度标记">

		</el-form-item>

		<span class="dialog-footer">
			<el-button @click="newSessionDialog = false">取 消</el-button>
			<el-button
				type="primary"
				@click="add"
			>确 定</el-button>
		</span>
	</el-form>
</template>

<script>
import timeCount from "./timeCount";
export default {
	name: "editSession",
	components: {
		timeCount
	},
	props: {
		realTime: {
			type: Boolean,
			default: false
		},
		session: {
			type: Object,
			default() {
				return {
					description:
						"一致性 Consistency如果这是一个tetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
					id: 1,
					parent: "",
					startTime: new Date(),
					endTime: new Date(),
					duration: 10000,
					startProgress: 0,
					endProgress: 20
				};
			}
		}
	},
	data() {
		return {
			description: this.session.description,
			note: this.session.note,
			startProgress: this.session.startProgress,
			endProgress: this.session.endProgress,
			duration: this.session.duration,
			sessionTime: [this.session.startTime, this.session.endTime],
			second: Math.floor((this.session.duration / 1000) % 60),
			minute: Math.floor((this.session.duration / 1000 / 60) % 60),
			hour: Math.floor((this.session.duration / 1000 / 60 / 60) % 24),
			day: Math.floor(this.session.duration / 1000 / 60 / 60 / 24)
		};
	},
	methods: {
		add() {
			this.$emit("getSession", data);
		}
	},
	watch: {
		sessionTime: {
			handler(newValue) {
				console.log(newValue);
				console.log(this.sessionTime);
				this.duration = newValue[1].getTime() - newValue[0].getTime();
				(this.second = Math.floor((this.duration / 1000) % 60)),
					(this.minute = Math.floor((this.duration / 1000 / 60) % 60)),
					(this.hour = Math.floor((this.duration / 1000 / 60 / 60) % 24)),
					(this.day = Math.floor(this.duration / 1000 / 60 / 60 / 24));
			},
			deep: true
		},
		second(val) {
			this.duration =
				(((Number(this.day) * 24 + Number(this.hour)) * 60 +
					Number(this.minute)) *
					60 +
					Number(val)) *
				1000;
		},
		minute(val) {
			this.duration =
				(((Number(this.day) * 24 + Number(this.hour)) * 60 + Number(val)) * 60 +
					Number(this.second)) *
				1000;
		},
		hour(val) {
			this.duration =
				(((Number(this.day) * 24 + Number(val)) * 60 + Number(this.minute)) *
					60 +
					Number(this.second)) *
				1000;
		},
		day(val) {
			this.duration =
				(((Number(val) * 24 + Number(this.hour)) * 60 + Number(this.minute)) *
					60 +
					Number(this.second)) *
				1000;
		}
	},
	computed: {
		finishedProgress: {
			get() {
				if (this.startProgress >= 0 && this.endProgress >= 0) {
					return this.endProgress - this.startProgress;
				} else {
					return 0;
				}
			},
			set(newValue) {
				if (Number(this.startProgress) >= 0) {
					this.endProgress = Number(this.startProgress) + Number(newValue);
				} else if (Number(this.endProgress) >= 0) {
					this.startProgress = Number(this.endProgress) - Number(newValue);
				}
			}
		}
	}
};
</script>

<style scoped>
</style>
