<template>
	<transition name="fade">
		<div class="m-msg" :class="{loading: isLoading}" v-show="show">
			<span class="content" v-if="!isLoading">{{msg}}</span>
			<i class="loading-icon" v-if="isLoading"></i>
		</div>
	</transition>
</template>

<script>
export default {
  data () {
    return {
    	msg: '正在加载',
    	duration: 3000,
    	show: false,
    	isLoading: false
    };
  },

  methods: {
  	showToast() {
  		this.isLoading = false;
  		this.show = true;

 			clearTimeout(this.timer);

  		this.timer = setTimeout(()=>{
  			this.show = false;
  		}, this.duration);
  	},

  	showLoading() {
      clearTimeout(this.timer);
  		this.isLoading = true;
  		this.show = true;
  	},

  	hideLoading() {
  		this.show = false;
  	}
  }
};
</script>

<style lang="scss" scoped>
.m-msg{
	position: fixed;
	top: 80%;
	left: 50%;
	padding: 8px 10px;
	color: #fff;
	background-color: rgba(0,0,0, 0.75);
	border-radius: 5px;
	font-size: 14px;
	transform: translate3d(-50%, -50%, 0);
	z-index: 9999;
	opacity: 1;

  &.loading{
    top: 50%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

@keyframes rotate{
	0%{-webkit-transform:rotate(0deg)}
	8.3%{-webkit-transform:rotate(30deg)}
	16.6%{-webkit-transform:rotate(60deg)}
	25%{-webkit-transform:rotate(90deg)}
	33.3%{-webkit-transform:rotate(120deg)}
	41.6%{-webkit-transform:rotate(150deg)}
	50%{-webkit-transform:rotate(180deg)}
	58.3%{-webkit-transform:rotate(210deg)}
	66.6%{-webkit-transform:rotate(240deg)}
	75%{-webkit-transform:rotate(270deg)}
	83.3%{-webkit-transform:rotate(300deg)}
	91.6%{-webkit-transform:rotate(330deg)}
}

.loading-icon {
  background-image: url(../assets/loading.png);
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
  -webkit-animation: rotate 1.6s step-start infinite;
  animation: rotate 1.6s step-start infinite;
  display:inline-block;
  vertical-align: middle;
}
</style>