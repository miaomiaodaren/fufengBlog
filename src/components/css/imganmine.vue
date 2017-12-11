<template>
	<div class="imganmine">
		<div class="west-01"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		// name: '多张图片连成一幅动画效果',
		data() {
			return {

			}
		}
	}
</script>
<style type="text/css">
	.imganmine{
		width: 100%;
		height: 500px;
		position: relative;
	}
	.west-01{
		position: absolute;
		width: 200px;
		height: 180px;
		left: 50%;
		margin-left: -100px;
		top: 100px;
		background-image: url(../../../static/west_01_3ca39fe.png);
		background-repeat: no-repeat;
		/*steps(8) 用来实现动画的拙针显示*/
		animation: play01 1.4s steps(8) infinite;
	}
	@keyframes play01{
		0% {
			background-position:0 0
		}
		100% {
			background-position:-1600px 0
		}
	}
</style>