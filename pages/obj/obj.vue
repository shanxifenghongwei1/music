<template>
	<view>
		<view class="any">
			<u-gap bg-color="#fff"></u-gap>
			<u-search placeholder="日照香炉生紫烟" :show-action="false" v-model="keyword"></u-search>
			<u-gap bg-color="#fff"></u-gap>
			<u-swiper :list="list" indicator-pos="bottomRight"></u-swiper>
			<u-gap bg-color="#fff"></u-gap>
			<u-grid :col="3" :border="true">
				<u-grid-item bg-color="#05B499" v-for="i in 3" :key="i">
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">视频课程</view>
				</u-grid-item>
				<u-grid-item v-for="i in 3" :key="i">
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">有声课程</view>
				</u-grid-item>
			</u-grid>
			<u-gap bg-color="#fff"></u-gap>
			<u-notice-bar mode="horizontal" :speed='1800' :is-circular='false' :list="listq"></u-notice-bar>
			<u-gap bg-color="#fff"></u-gap>
			<u-cell-group :border='false'>
					<u-cell-item :title-style='titlestyle' title="推荐视频" :arrow='false' >
						<template v-slot:right-icon>
							<view>换一换<u-icon name="reload"></u-icon></view>			
						</template>
					</u-cell-item>
			</u-cell-group>
			<u-gap bg-color="#fff"></u-gap>
		</view>

		<u-gap bg-color="#fff" height="200"></u-gap>
		<view @click="go(123456789)">这是第二个页面</view>
		<view style="width: 100%;height: 50px;"><u-icon name="star" @touchstart="show1"></u-icon></view>

		<view class="">
			<u-cell-group :border="false">
				<u-cell-item
					v-for="(item, index) in lists"
					:key="index"
					:value-style="value_style"
					:arrow="false"
					:title="item.realName"
					:value="item.idCard"
					@click="checkboxChange({ name: index, value: item.checked })"
				>
					<template v-slot:icon>
						<view class="pr15">
							<u-checkbox-group>
								<u-checkbox shape="circle" @change="checkboxChange" active-color="#e15248" v-model="item.checked" :name="index"></u-checkbox>
							</u-checkbox-group>
						</view>
					</template>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			titlestyle:{'font-size':'40rpx','color':'#333','font-weight': '600'},
			listq: ['寒雨连江夜入吴', '平明送客楚山孤', '洛阳亲友如相问', '一片冰心在玉壶'],
			list: [
				{
					image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2164724814,1401845036&fm=26&gp=0.jpg',
					title: '蒹葭苍苍，白露为霜。所谓伊人，在水一方'
				},
				{
					image:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593755509837&di=7e454022940fd0c45629b1732d393cb6&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20191006%2F19%2F1570360737-HvGOTkxnum.jpg',
					title: '溯洄从之，道阻且长。溯游从之，宛在水中央'
				},
				{
					image:
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593755509837&di=7758cd8e06de45c77db92893a648f902&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F130506%2F240498-1305060IU666.jpg',
					title: '蒹葭萋萋，白露未晞。所谓伊人，在水之湄'
				}
			],
			lists: [
				{
					realName: '全部',
					checked: false
				}
			]
		};
	},
	methods: {
		checkboxChange(e) {
			this.lists[e.name].checked = !this.lists[e.name].checked;
		},

		show1() {
			this.conss(1);
		},
		go(e) {
			console.log('点击跳转');
			uni.$on('update', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			});
		}
	},
	onLoad() {}
};
</script>

<style lang="scss">

</style>
