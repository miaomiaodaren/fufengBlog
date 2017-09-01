<template>
	<div id="choujiang">
		<section class="gb-wheel-container" id="gbWheel">
		    <div class="gb-wheel-content gb-wheel-run">
		        <ul class="gb-wheel-line">
		        	<li class="gb-wheel-litem" v-for="(n, index) in cjcon" ></li>
		        </ul>
		        <div class="gb-wheel-list" v-html="itemListHtml.join('')"></div>
		    </div>
		    <p class="gb-wheel-btn" @click="startCJ" id="gbLottery">抽奖</p>     
		</section>
	</div>
</template>
<script type="text/javascript">
// :style="{transform: 'rotate('+ (index * turnNum + turnNum / 2) +')turn'}"
	export default {
		data() {
			return {
				cjcon: [
		            {'index': 0, 'text': '耳机' , 'name': 'icono-headphone'},
		            {'index': 1, 'text': 'iPhone' , 'name': 'icono-iphone'},
		            {'index': 2, 'text': '相机' , 'name': 'icono-camera'},
		            {'index': 3, 'text': '咖啡杯' , 'name': 'icono-cup'},
		            {'index': 4, 'text': '日历', 'name': 'icono-calendar'},
		            {'index': 5, 'text': '键盘', 'name': 'icono-keyboard'},
		            {'index': 6, 'text': '卫生巾', 'name': 'icono-wsj'}
		        ],
		        lineListHtml: [],
        		itemListHtml: [],
        		turnNum: 1 / (this.cjcon.length),
        		cjcount: 0
			}
		},
		methods: {
			cjaddHtml() {
				let len = this.cjcon.length,
					turnNum = 1 / len;
				this.cjcon.forEach((v, i, a)=> {
			        // this.lineListHtml.push('<li class="gb-wheel-litem" style="transform: rotate('+ (i * turnNum + turnNum / 2) +'turn)"></li>');
			        this.itemListHtml.push('<div class="gb-wheel-item">');
			        this.itemListHtml.push('<div class="gb-wheel-icontent" style="transform: rotate('+ (i * turnNum) +'turn)">');
			        this.itemListHtml.push('<p class="gb-wheel-iicon">');
			        this.itemListHtml.push('<i class="'+v.name+'"></i>');
			        this.itemListHtml.push('</p>');
			        this.itemListHtml.push('<p class="gb-wheel-itext">');
			        this.itemListHtml.push(v.text);
			        this.itemListHtml.push('</p>');
			        this.itemListHtml.push('</div>');
			        this.itemListHtml.push('</div>');
			    });         
			},
			startCJ() {
				let len = this.cjcon.length,
					addtr = 360 - (360 / len) * 2;
				this.cjcount ++;
				document.getElementById('choujiang').querySelector('.gb-wheel-content').style = 'transform: rotate('+(addtr + 1800) * this.cjcount +'deg)'; 
			}
		},
		mounted() {
			this.cjaddHtml()
		}
	}
</script>
<style lang="sass" type="text/sass">

.gb-wheel-container ul,
.gb-wheel-container li,
.gb-wheel-container p 
    margin: 0
    padding: 0
.gb-wheel-container ul
.gb-wheel-container li 
	list-style: none

.gb-wheel-container 
    margin: 0 auto
    position: relative
    width: px2rem(600)
    height: px2rem(600)
    border-radius: 50%
    box-shadow: 0 2px 3px #333, 0 0 2px #000
    overflow: hidden

.gb-wheel-content 
    position: absolute
    left: px2rem(20)
    top: px2rem(20)
    z-index: 2
    width: px2rem(560)
    height: px2rem(560)
    box-sizing: border-box
    border-radius: inherit
    background-clip: padding-box
    background: -webkit-radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 0 0, -webkit-radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 8px 8px, -webkit-radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px, -webkit-radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px
    background: radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 0 0, radial-gradient(rgba(100, 100, 100, 0.1) 15%, transparent 16%) 8px 8px, radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px, radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px
    background-color: #ffcb3f
    background-size: px2rem(24) px2rem(28)

.gb-wheel-content:before 
    content: ' '
    position: absolute
    left: px2rem(-20)
    top: px2rem(-20)
    z-index: -1
    width: px2rem(560)
    height: px2rem(560)
    border-radius: inherit
    box-sizing: content-box
    border: px2rem(20) solid #E44025
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2) inset

.gb-wheel-list 
    position: absolute
    left: 0
    top: 0
    width: inherit
    height: inherit
    z-index: 9999

.gb-wheel-item
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    color: #e4370e
    font-weight: bold
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6)

.gb-wheel-icontent
    position: relative
    display: block
    padding-top: px2rem(30)
    margin: 0 auto
    text-align: center
    -webkit-transform-origin: 50% px2rem(280)
    -ms-transform-origin: 50% px2rem(280)
    transform-origin: 50% px2rem(280)

.gb-wheel-itext 
    @includes font-dpr(20)
    font-weight: lighter

.gb-wheel-iicon [class*=icono-] 
    color: #e4370e

.gb-wheel-line 
    position: absolute
    left: 0
    top: 0
    width: inherit
    height: inherit
    z-index: 99

.gb-wheel-litem 
    position: absolute
    left: px2rem(280)
    top: 0
    width: 1px
    height: px2rem(280)
    background-color: rgba(228, 55, 14, 0.6)
    overflow: hidden
    -webkit-transform-origin: 50% px2rem(280)
    -ms-transform-origin: 50% px2rem(280)
    transform-origin: 50% px2rem(280)

.gb-wheel-btn 
    position: absolute
    left: px2rem(220)
    top: px2rem(220)
    z-index: 400
    width: px2rem(160)
    height: px2rem(160)
    border-radius: 50%
    color: #F4E9CC
    background-color: #E44025
    line-height: px2rem(160)
    text-align: center
    font-size: px2rem(40)
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6)
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6), 0 0 5px 4px rgba(0, 0, 0, 0.2) inset
    text-decoration: none

p.gb-wheel-btn 
    border-bottom: none

.gb-wheel-btn::after 
    position: absolute
    content: ''
    left: px2rem(50)
    top: px2rem(-20)
    width: px2rem(60)
    height: px2rem(60)
    background-color: #E44025
    -webkit-transform: rotate(45deg)
    -ms-transform: rotate(45deg)
    transform: rotate(45deg)
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6), 0 0 5px 4px rgba(0, 0, 0, 0.2) inset

.gb-wheel-btn.disabled,
.gb-wheel-btn.disabled::after 
    pointer-events: none
    background: #B07A7B
    color: #ccc

.gb-wheel-run
    -webkit-transition: transform 6s ease
    transition: transform 6s ease
</style>