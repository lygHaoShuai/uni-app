<template>
	<view class="detail" v-if='songDetail.al'>
		<view class="fixbg bjImage" :style="{ 'background-image' : 'url(' + songDetail.al.picUrl + ')' }" ></view>
		<musicHead :title=" songDetail.name " :icon='true'></musicHead>
		<view class="container" v-if="!isLoad">
			<scroll-view scroll-y='true' >
				<view style="height: 880rpx;position: relative;">
					<view class="detali-play" style="background: url('/static/assets/disc.png');background-size: cover;">
						<image :src='songDetail.al.picUrl' :class="{ 'detali-play-run' : isPlayRotate }"></image>
						<text class="iconfont" :class="iconPlay" @tap='headPlay'></text>
						
						<view style="background: url('/static/assets/needle.png');background-size: cover;"></view>
					</view>
					<scroll-view scroll-y='true' :scroll-top="lyricComment * 40"  class="detail-lyric">
						<view v-for="(item,index) in lyricKey" :key='index'>
							<view class="detail-lyric-item" :class="{'active' : lyricComment === index}">
								{{ lyric(item) }}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">相似音乐</view>
				
					<view class="detail-like-item" v-for="(item,index) in songSimi" :key='index' @tap='similaritySong(item.id)'>
						<view class="detail-like-img">
							<image :src="item.album.blurPicUrl"></image>
						</view>
						<view class="detail-like-song">
							<view>{{ item.name }}</view>
							<view>
								<image v-if="item.privilege.flag > 60 && item.privilege.flag < 70"
								src="../../static/assets/dujia.png"></image>
								<image v-if="item.privilege.maxbr === 999000"
								src="../../static/assets/sq.png"></image>
								{{ item.album.artists[0].name }}-{{ item.name }}
							</view>
						</view>
						<text class="iconfont iconbofang"></text>
					</view>
					
					
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">歌曲评论</view>
					<view class="detail-comment-item"
					 v-for="(item,index) in songComment" :key='index'>
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl"></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view>{{ item.user.nickname }}</view>
									<view>{{ time(item.time) }}</view>
								</view>
								<view class="detail-comment-like">
									{{ goods(item.likedCount) }}万<text class="iconfont iconlike"></text>
								</view>
							</view>
							<view class="detail-comment-text">{{ item.content }}</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
	import '../../common/iconfont.css';
	import{ songDetail,songSimi,songComment,songLyric,songUrl } from '../../common/app.js'
	import musicHead from '../../components/music-head/music-head.vue'
	export default {
		data() {
			return {
				songDetail: {},
				songSimi: [],
				songComment: [],
				songLyric: [],
				lyricKey: [],
				iconPlay: 'iconpause',
				isPlayRotate: true,
				lyricComment: 0,
				topScroll: 0,
				isLoad: true
			}
		},
		components: {
			musicHead
		},
		onLoad(options) {
			this.getMusic(options.songId)
			
		},
		onUnload() {
			// #ifdef H5
				this.baAuaionMannager.destroy()
			// #endif
		},
		onHide() {
			// #ifdef H5
				this.baAuaionMannager.destroy()
			// #endif
		},
		methods: {
			similaritySong(id) {
				this.getMusic(id)
				this.lyricComment = 0
				wx.pageScrollTo({
					scrollTop: 0
				})
			},
			lyric(item) {
				return this.songLyric[item]
			},
			getMusic(id) {
				uni.showLoading({
					title: '加载中...'
				})
				this.isLoad = true
				songDetail(id).then((res) => {
					this.songDetail = res.songs[0]
				})
				songSimi(id).then((res) => {
					this.songSimi = res.songs
				})
				songComment(id).then((res) => {
					this.songComment = res.hotComments
				})
				songLyric(id).then((res) => {
					let lyric = res.lrc.lyric
					let re = /\[([^\]]+)\]([^\[]+)/g
					let result = []
					
					lyric.replace(re,(all,time,lyric) => {
						if(lyric.substr(0,lyric.length-1).length > 0) {
							result[this.playTime(time)] = lyric.substr(0,lyric.length-1)
						}
						
					})
					this.songLyric = result
					this.lyricKey = Object.keys(result)
				})
				songUrl(id).then((res) => {
					this.songUrl = res
					// #ifdef MP-WEIXIN
					this.baAuaionMannager = uni.getBackgroundAudioManager();
					this.baAuaionMannager.title = songDetail.name;
					
					// #endif
					
					// #ifdef H5
					if(!this.baAuaionMannager){
						this.baAuaionMannager = uni.createInnerAudioContext();
						
					}
					this.iconPlay = 'iconbofang1'
					this.isPlayRotate = false
					// #endif
					
					this.baAuaionMannager.src = this.songUrl.url
					this.listenLyric()
					this.baAuaionMannager.onPlay(() => {
						this.iconPlay = 'iconpause'
						this.isPlayRotate = true
					})
					this.baAuaionMannager.onPause(() => {
						this.iconPlay = 'iconbofang1'
						this.isPlayRotate = false
					})
				})
				uni.hideLoading()
				this.isLoad = false
			},
			playTime(time) {
				let newTime = time.split(':')
			
				time = Number(newTime[0]*60) + Number(newTime[1])
				return Number(time).toFixed(1)
			},
			goods(count) {
				return (count / 10000).toFixed(2)
			},
			time(time) {
				let newTime = new Date(time)
				
				let year = newTime.getFullYear()
				let month = newTime.getMonth() + 1 >= 10 ? newTime.getMonth() + 1 : `0${newTime.getMonth() + 1}`
				let date = newTime.getDate()
				
				return `${year} - ${month} - ${date}`
			},
			headPlay() {
				if(this.baAuaionMannager.paused) {
					this.baAuaionMannager.play()
					this.listenLyric()
					
				} else {
					this.baAuaionMannager.pause()
					clearInterval(this.timer)
				}
				
			},
			listenLyric() {
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					if(this.baAuaionMannager.currentTime > 0) {
						if(this.songLyric[this.baAuaionMannager.currentTime.toFixed(1)]) {
							this.lyricComment = this.lyricKey.indexOf(`${this.baAuaionMannager.currentTime.toFixed(1)}`)
							
						}
					}
				},100)
			}
		}
	}
</script>

<style scoped>
.bjImage {
	background-position:-192px 0;
}
.detali-play {
	width: 580rpx;
	height: 580rpx;
	margin: 214rpx auto 0 auto;
	position: relative;
	
}
.detali-play image {
	width: 370rpx;
	height: 370rpx;
	border-radius: 50%;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	animation: 10s linear move infinite;
	animation-play-state: paused;
}
.detali-play .detali-play-run {
	animation-play-state: running;
}
@keyframes move{
	from{ transform: rotate(0deg); }
	to{ transform: rotate(360deg); }
}
.detali-play text {
	width: 100rpx;
	height: 100rpx;
	font-size: 100rpx;
	color: white;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.detali-play view {
	width: 230rpx;
	height: 360rpx;
	position: absolute;
	left: 100rpx;
	right: 0;
	top: -200rpx;
	margin: auto;
}

.detail-lyric {
	font-size: 32rpx;
	height: 300rpx;
	position: absolute;
	margin-top: -96px;
	/* margin-left: 50px; */
	text-align: center;
	/* overflow: scroll; */
	color: #919193;
}

.detail-lyric-item {
	height: 82rpx;
	line-height: 82rpx;
	
}
.detail-lyric-item.active {
	color: white;
	
}

.detail-like {
	margin: 0 30rpx;
}
.detail-like-head {
	font-size: 36rpx;
	color: white;
	margin: 50rpx 0;
}
.detail-like-item {
	display: flex;
	align-items: center;
	margin-bottom: 28rpx;
}
.detail-like-item text {
	font-size: 50rpx;
	color: #c6c2bf;
}
.detail-like-img {
	width: 82rpx;
	height: 82rpx;
	border-radius: 20rpx;
	overflow: hidden;
	margin-right: 20rpx;
	
}
.detail-like-img image {
	width: 100%;
	height: 100%;
}
.detail-like-song {
	flex: 1;
	color: #c6c2bf;
}
.detail-like-song view:nth-child(1) {
	font-size: 28rpx;
	color: white;
	margin-bottom: 12rpx;
}
.detail-like-song view:nth-child(2) {
	font-size: 22rpx;
}
.detail-like-song image {
	width: 26rpx;
	height: 20rpx;
	margin-right: 10rpx;
}

.detail-comment {
	margin: 0 30rpx;
}
.detail-comment-head {
	font-size: 36rpx;
	color: white;
	margin: 50rpx 0;
}
.detail-comment-item {
	margin-bottom: 28rpx;
	display: flex;
}
.detail-comment-img {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 18rpx;
}
.detail-comment-img image {
	width: 100%;
	height: 100%;
}
.detail-comment-content {
	flex: 1;
	color: #cbcacf;
}
.detail-comment-title {
	display: flex;
	justify-content: space-between;
}
.detail-comment-name {}
.detail-comment-name view:nth-child(1) {
	font-size: 26rpx;
}
.detail-comment-name view:nth-child(2) {
	font-size: 20rpx;
}
.detail-comment-like {
	font-size: 28rpx;
}
.detail-comment-like text {
	margin-left: 20rpx;
}
.detail-comment-text {
	font-size: 28rpx;
	line-height: 40rpx;
	color: white;
	margin-top: 20rpx;
	border-bottom: 1px #59595b solid;
	padding-bottom: 40rpx;
}
</style>
