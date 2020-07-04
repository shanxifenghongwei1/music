<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<navigator url="/pages/obj/obj" class="text-area">
			<text class="title">{{ title }}</text>
			<text>{{ timetexts }}</text>
		</navigator>
		<view class="progress flex1">
			<view class="c1"></view>
			<u-slider style="width: 80%;" v-model="value" :use-slot="true" max="100" @end="solidend" @moving="afal" @start="start">
				<view class="solttext">
					<view class="sons" v-if="a">{{ timetexts }}</view>
					{{ timetexts }}
				</view>
			</u-slider>
			
			<view class="c2"></view>
		</view>
		<view class="flex">
			<u-icon name="skip-back-left"></u-icon>
			<view class="redu" @click="plays"><u-icon :name="paly ? 'pause' : 'play-right-fill'"></u-icon></view>
			<view><u-icon name="skip-forward-right"></u-icon></view>
		</view>
		<view class="">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" prop="name" :required="true"><u-input v-model="form.name" /></u-form-item>
				<u-form-item label="简介" prop="intro"><u-input v-model="form.intro" /></u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			a: true,
			paly: false,
			value: 0,
			playloding: '',
			playend: 178.573061,

			title: '播放',
			form: {
				name: '',
				intro: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur'],
						type: 'string',
						min: 3
					}
				],
				intro: [
					{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}
				]
			}
		};
	},
	computed: {
		timetexts: function() {
			return this.timechang((this.value / 100) * this.playend) + '/' + this.timechang(this.playend);
		}
	},
	onShow() {
		// 事件收发
		uni.$emit('update', { msg: 456 });
	},
	onLoad() {
		// this.vuex_video = uni.createInnerAudioContext()
		this.$u.vuex('vuex_video', uni.createInnerAudioContext());
		this.vuex_video.src = 'https://webfs.yun.kugou.com/202007021416/bcb61963c5cbd91c1a4610163ddb9c6b/G196/M06/1F/04/ZIcBAF6L5beASSAOAB9f8SqjYZY311.mp3';
		this.vuex_video.autoplay = true;

		this.conss(this.vuex_video, '播放');
		// 音频长度
		this.playend = 178.573061;
		// 当前播放
		this.playloding = this.vuex_video.currentTime;
		this.start();
		this.conss('播放长度', this.playloding);
	},
	// onUnload() {
	// 	uni.$off('update')
	// },
	// 可以分为类函数封装
	// 1.切换音频的函数
	// 2.音频暂停 播放 停止 这些事件的监听函数
	// 3.音频进度与现在播放时间的封装
	onReady() {
		//表单验证
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		afal() {
			this.a = true;
		},
		// 滑块华东结束/
		solidend() {
			this.seeks();
		},
		start() {
			this.conss('暂停了');
			this.vuex_video.pause();
		},
		// 播放事件
		playing() {
			this.paly = true;
			this.vuex_video.play();
			// this.vuex_video.onPlay()
			this.vuex_video.onTimeUpdate(() => {
				this.conss('捕捉到了');
				this.playloding = this.vuex_video.currentTime;
				this.value = (this.vuex_video.currentTime / this.playend) * 100;
			});
		},
		// 暂停重新开始事件
		seeks() {
			this.a = false;
			this.vuex_video.seek((this.value / 100) * this.playend);
			this.vuex_video.onSeeking(() => {
				this.playing();
			});
		},
		// 播放开关
		plays() {
			if (this.paly) {
				this.vuex_video.pause();
				this.paly = !this.paly;
			} else {
				this.paly = !this.paly;
				this.playing();
			}
		},
		// 表单确认
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},

		timechang(time) {
			// 时间过滤
			let result = parseInt(time);
			let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
			let m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60);
			let s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60);
			if (parseInt(h) === 0) {
				return `${m}:${s}`;
			} else {
				return `${h}:${m}:${s}`;
			}
		}
	}
};
</script>

<style lang="scss">
.solttext {
	font-size: 12px;
	border-radius: 8px;
	padding: 5px;
	color: #ffffff;
	background: #212a3d;
	position: relative;
}
.sons {
	font-size: 12px;
	border-radius: 8px;
	padding: 5px;
	color: #666;
	background-image: linear-gradient(to right, rgba(255, 0, 0, 0), rgba(255, 0, 0, 1));
	position: absolute;
	top: -35px;
	left: 0;
}
.progress {
	width: 88%;
	padding: 0 6%;
	margin-top: 40px;
}
.redu {
	width: 30px;
	height: 30px;
	line-height: 30px;
	border-radius: 15px;
	background: #15c288;
	text-align: center;
}
.flex {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
}
.c1 {
	width: 10%;
	height: 3px;
	background: #2979ff;
}
.c2 {
	width: 10%;
	height: 3px;
	background: #c0c4cc;
}
.flex1 {
	margin: 10px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
