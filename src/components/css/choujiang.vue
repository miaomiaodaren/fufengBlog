<template>
	<div class="choujiang">
		<ul id="cjmain clearfix">
			<li v-for="(n, index) in 16" :class="{isuse: activess.includes(index + 1), active: n === activess[startindex - 1]}">{{n}}</li>
		</ul>
		<div class="isstart" @click="startcj">点击开始</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				activess: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5],
				st: '',
				st2: '',
				startindex: 1,    //起始位置
				cjcount: 12,
				spend: 50,   //转圈速度
				cycle: 10,   //最少转圈次数
				scycle: 0,	//已经转了多少圈
				winer: 8,
				winid: ''
			}
		},
		computed: {

		},
		methods: {
			startcj() {
				this.st = setInterval(()=> {
					this.chageactive('s')
				}, this.spend);
				// this.chageactive()
			},
			chageactive(t) {
				if(t === 's') {
					if(this.scycle === this.cycle + 3 ) {
						this.winid = this.activess.findIndex((v, i, a) => {
							return v === this.winer
						});
						clearInterval(this.st);	
						this.st = setInterval(()=> {
							this.startindex ++;
						}, this.spend);
						setTimeout(() => {
							clearInterval(this.st);	
							this.okcj();
							return false
						}, this.spend * this.winid)
					};
					if(this.startindex === 12) {
						if(this.cycle - this.scycle <= 3) {
							this.spend = this.spend + 20;
						}
						this.startindex = 1;
						clearInterval(this.st);
						this.st = setInterval(()=> {
							this.chageactive('s')
						}, this.spend);
						this.scycle++;
						return false;
					};
					this.startindex ++;
				}
				//  else {
				// 	if(this.endcycle == this.sendcyle) {
				// 		clearInterval(this.st2);
				// 		this.okcj();
				// 		return false
				// 	};
				// 	if(this.endindex === 12) {this.endindex = 1; this.sendcyle ++; return false};
				// 	this.endindex ++;
				// }
			},
			okcj() {
				this.scycle = 0; 
				this.startindex = this.winid + 1;
				this.sendcyle = 0;
				this.spend = 50,
				alert('2222222');
			}
		}
	}
</script>
<style lang="sass" scoped type="text/sass">
	.choujiang
		padding: px2rem(40)
		position: relative
		ul
			width: 100%
			background-color: #fff
			li
				width: px2rem(167.5)
				height: px2rem(167.5)
				float: left
				border: 1px solid #ddd
				line-height: px2rem(167.5)
				&.active
					background-color: #ff0000
		.isstart
			width: px2rem(167.5 *2)
			height: px2rem(167.5 *2)
			position: absolute
			top: px2rem(207.5)
			left: px2rem(207.5)
			z-index: 10
			background-color: #fff
			border: 1px solid #ddd
			cursor: pointer
			line-height: px2rem(167.5 * 2)
</style>