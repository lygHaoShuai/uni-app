<template>
	<view class="index">
		<musicHead title='网易云接口' :icon='false'></musicHead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="(item,index) in topList" 
					:key='index' @tap='handleToList(item.id)'>
						<view class="index-list-img">
							<image :src="item.coverImgUrl"></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text" >
							<view v-for='(text,indexText) in item.tracks' :key='indexText'>
								{{indexText + 1}}&ensp;.&ensp;{{text.first}}&ensp;-&ensp;{{text.second}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import '../../common/iconfont.css';
	import musicHead from '../../components/music-head/music-head.vue'
	import{ topList } from '../../common/app.js'
	export default {
		data() {
			return {
				topList: []
			}
		},
		components: {
			musicHead
		},
		onLoad() {
			topList().then((res) => {
				if(res.length) {
					this.topList = res
				}
			})
		},
		methods: {
			handleToList(id) {
				uni.navigateTo({
					url: `/pages/list/list?listId=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.index {
		
	}
	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}
	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}
	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}
	.index-list {
		margin: 0 30rpx;
	}
	.index-list-item {
		display: flex;
		margin-bottom: 34rpx;
	}
	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}
	.index-list-img image {
		width: 100%;
		height: 100%;
	}
	.index-list-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 20rpx;
	}
	.index-list-text {
		font-size: 24rpx;
		line-height: 66rpx;
	}
	.index-list-text view {
		width: 200px;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}
</style>
