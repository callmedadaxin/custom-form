<template>
	<div class="swiper-container">
		<div id="swiper" ref="swiperWrap" :style="{width: width}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import '../animatecss/animate.min.css';
import FullPage from '../alloy_touch/alloy_touch.full_page.js';

export default {
	props: {
		//滑动延时
		duration: {
			default: 1000
		},
		//方向， vertical,horizontal
		direction: {
			default: 'vertical'
		}
	},

  data () {
    return {
    	slideEls: [],
    };
  },

  computed: {
  	vertical: function () {
  		return this.direction == 'vertical';
  	},

  	width: function () {
  		return this.vertical ? '100%' : window.innerWidth * this.slideEls.length + 'px';
  	},

  	float: function () {
  		return this.vertical ? '' : 'left'
  	}
  },

  mounted() {
  	this.slideEls = [].map.call(this.$refs.swiperWrap.children, el => el);

  	new FullPage('#swiper', {
  		animationEnd:function () {
      
      },
      leavePage: function (index) {
        console.log("leave"+index)
      },
      beginToPage: function (index) {
        console.log("to"+index);
      },
      duration: this.duration,
      vertical: this.vertical
  	})
  }
};
</script>

<style lang="scss" scoped>
.swiper-container{
	width: 100%;
	overflow: hidden;
	height: 100%;
}
#swiper{
	width: 100%;
	height: 100%;
}
</style>