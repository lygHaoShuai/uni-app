<template>
	<view class="list" v-if='song.coverImgUrl'>
		<view class="fixbg" :style="{ 'background-image' : 'url(' + song.coverImgUrl + ')' }"></view>
		<musicHead title='榜单列表' :icon='true'></musicHead>
		<view class="container">
			<scroll-view scroll-y='true'>
				<view class="list-head">
					<view class="list-head-img">
						<image :src="song.coverImgUrl"></image>
						<text class="iconfont iconyousanjiao">{{ playCount(song.playCount) }}亿</text>
					</view>
					<view class="list-head-text">
						<view>{{ song.name }}</view>
						<view v-if='song.creator'>
							<image :src="song.creator.avatarUrl"></image>
							{{ song.creator.description }}
						</view>
						<view>
							{{ song.description }}
						</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
					<button class="list-share" open-type="share">
						<text class="iconfont iconicon-"></text>分享给微信给
					</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont iconbofang1"></text>
						<text>播放全部</text>
						<text>(共{{ songList.length }}首)</text>
					</view>
					<view class="list-music-item" v-for="(item,index) in songList" 
					:key='index' @tap='handleToDetail(item.id)'>
						<view class="list-music-top">
							{{ listIndex(index) }}
						</view>
						<view class="list-music-song">
							<view>{{ item.name }}</view>
							<view>
								<image src="/static/assets/dujia.png" mode=""></image>
								<image src="/static/assets/sq.png" mode=""></image>
								{{ item.ar[0].name }}-{{ item.name }}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '../../common/iconfont.css';
	import{ song,songList } from '../../common/app.js'
	import musicHead from '../../components/music-head/music-head.vue'
	export default {
		data() {
			return {
				song: [],
				songList: []
			};
		},
		components: {
			musicHead
		},
		onLoad(optios) {
			song(optios).then(res => {
				this.song = res
			})
			songList(optios).then(res => {
				this.songList = res
			})
		},
		methods: {
			playCount(count) {
				return (count / 100000000).toFixed(1)
			},
			listIndex(index) {
				return (index + 1) >= 10 ? index + 1 : `0${index + 1}` 
			},
			handleToDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?songId=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.list-head {
		display: flex;
		margin: 30rpx;
	}
	.list-head-img {
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}
	.list-head-img image {
		width: 100%;
		height: 100%;
	}
	.list-head-img text {
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: white;
		font-size: 26rpx;
	}
	.list-head-text {
		flex: 1;
		color: #f0f2f7;
	}
	.list-head-text view:nth-child(1) {
		color: white;
		font-size: 34rpx;
	}
	.list-head-text view:nth-child(2) {
		display: flex;
		margin: 20rpx 0;
		font-size: 24rpx;
	}
	.list-head-text view:nth-child(2) image {
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}
	.list-head-text view:nth-child(3) {
		line-height: 34rpx;
		font-size: 22rpx;
	}
	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0,0,0,0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}
	.list-share text {
		margin-right: 16rpx;
	}
	
	.list-music {
		background: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}
	.list-music-head {
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}
	.list-music-head text:nth-child(1) {
		height: 50rpx;
		font-size: 50rpx;
	}
	.list-music-head text:nth-child(2) {
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}
	.list-music-head text:nth-child(3) {
		font-size: 26rpx;
		color: #b2b2b2;
	}
	.list-music-item {
		display: flex;
		margin: 0 32rpx 66rpx 46rpx;
		align-items: center;
		color: #959595;
	}
	.list-music-item text {
		font-size: 50rpx;
		color: #c7c7c7;
	}
	.list-music-top {
		width: 58rpx;
		font-size: 50rpx;
		line-height: 50rpx;
		padding-right: 15px;
	}
	.list-music-song {
		flex: 1;
	}
	.list-music-song view:nth-child(1) {
		font-size: 28rpx;
		color: black;
	}
	.list-music-song view:nth-child(2) {
		display: flex;
		font-size: 20rpx;
	}
	.list-music-song view:nth-child(2) image {
		width: 32rpx;
		height: 20rpx;
		margin-right: 10rpx;
	}
	
</style>
