<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

.container {
	width: 100%;
	height: calc(100vh - 70px);
	overflow: hidden;
}
.container scroll-view {
	 height: 100%;
}
.fixbg {
	width: 100%;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	background-size: cover;
	background-position:center 0;
}
</style>
