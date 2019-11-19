<template>
	<div class="wrapper">
		<h1
			:sendSync="sendSync"
			:autoStart="autoStart"
			:defaultVal="defaultVal"
			id=mytime
		>{{countString}}</h1>
		<el-button
			id="pause"
			name="button"
			@click="pauseCountFn"
		>pause</el-button>
		<el-button
			id="start"
			name="button"
			@click="startCountFn"
		>start</el-button>
		<el-button
			id="reset"
			name="button"
			@click="reset"
		>reset</el-button>
		<el-button
			id="top"
			name="button"
			@click="stopCountFn"
		>stop</el-button>

	</div>
</template>
<script>
export default {
	data() {
		return {
			isStart: false,
			globalTimer: null, //获取setInterval对象值
			countString: "00:00:00", //用来显示时间
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
			countVal: this.defaultVal, //获取初始值
			countStart: this.defaultVal,
			countExsit: 0,
			pauseTime: 0
		};
	},
	watch: {
		countString: {
			deep: true,
			handler: function(val, oldVal) {
				var vm = this;
				if (vm.needSendSunc) {
					vm.passToParent(val);
				}
			}
		},
		needSendSunc: {
			deep: true,
			handler: function(val) {
				var vm = this;
				if (val) {
					vm.passToParent(vm.countString);
				}
			}
		}
	},
	props: {
		sendSync: {
			type: Boolean,
			default: false
		},
		autoStart: {
			type: Boolean,
			default: false
		},
		defaultVal: {
			type: Number,
			default: 0
		}
	},
	mounted() {
		var vm = this;
		if (vm.autoStart) {
			vm.startCountFn();
		}
	},
	computed: {
		needSendSunc: function() {
			return this.sendSync;
		}
	},
	created: function() {
		this.$on("startCount", function() {
			this.startCountFn();
		});
		this.$on("stopCount", function() {
			this.stopCountFn();
		});
	},
	components: {},
	methods: {
		toDub(n) {
			//补0操作
			if (n < 10) {
				return "0" + n;
			} else {
				return "" + n;
			}
		},
		counterFn: function(counterTime) {
			var vm = this;
			var nowDate = new Date().getTime();
			var num = nowDate - counterTime + vm.countExsit;
			// if (vm.pauseTime == 0) {
			// 	var num = nowDate - counterTime; //计算时间毫秒差
			// } else {
			// 	vm.pauseTime = vm.pauseTime + 10;
			// 	var num = vm.pauseTime - counterTime; //计算时间毫秒差
			// }
			var leave1 = num % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			vm.day = Math.floor(num / (24 * 3600 * 1000)); //计算相差天数
			vm.hour = this.toDub(Math.floor(leave1 / (3600 * 1000))); //计算相差小时
			vm.minute = this.toDub(Math.floor(leave2 / (60 * 1000))); //计算相差分钟
			vm.second = this.toDub(Math.round(leave3 / 1000)); //计算相差秒
			var time = vm.hour + ":" + vm.minute + ":" + vm.second;
			if (vm.day > 0) {
				vm.countString = `${vm.day}天  + ${time}`;
			} else {
				vm.countString = time;
			}
		},
		startCountFn: function() {
			var vm = this;
			if (!vm.isStart) {
				vm.countVal = vm.countVal ? vm.countVal : new Date().getTime();
				vm.countStart = new Date().getTime();
				var timer = setInterval(function() {
					vm.counterFn(vm.countStart);
				}, 10);
				vm.globalTimer = timer;
				vm.isStart = true;
			}
		},
		pauseCountFn: function() {
			var vm = this;
			if (vm.isStart) {
				vm.countExsit = vm.countExsit + new Date().getTime() - vm.countStart;
				window.clearInterval(vm.globalTimer);
				vm.isStart = false;
				vm.globalTimer = null;
			}
		},
		stopCountFn: function() {
			var vm = this;
			if (vm.isStart) {
				window.clearInterval(vm.globalTimer);
				vm.globalTimer = null;
				vm.isStart = false;
				vm.pauseTime = new Date().getTime();
				var result = new Date().getTime() - vm.countStart + vm.countExsit;
				vm.passToParent(result);
			}
		},
		reset: function() {
			var vm = this;
			if (vm.isStart) {
				window.clearInterval(vm.globalTimer);
				vm.globalTimer = null;
				vm.isStart = false;
				vm.pauseTime = new Date().getTime();
				vm.countExsit = 0;
				vm.countString = "00:00:00";
			}
		},
		passToParent: function(data) {
			var vm = this;
			this.$emit("getDataFromChild", data);
		}
	}
};
</script>
<style>
#mytime {
	background: #bbb;
	color: #fff;
	display: block;
}
.wrapper {
	text-align: center;
	width: 60%;
	margin: auto;
}
</style>
