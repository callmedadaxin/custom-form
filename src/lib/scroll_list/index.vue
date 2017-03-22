<template>
	<div class="m-list" ref="wrap">
		<div class="list-content" ref="listContent" v-touch="{
			options: options,
			methods: {
				change: onChange,
				touchStart: resetMin,
			},
			min: min,
			max: max
		}">
			<ul class="list-ul">
				<slot name="item" v-for="item in items" :data="item"></slot>
			</ul>
			<div class="loading-more" ref="loading">
        <slot name="more">
          <i class="loading-icon"></i>正在加载中，请稍后...
        </slot>
      </div>
		</div>
	</div>
</template>

<script>
import { post } from 'common/js/api.js';

export default {
  props: {
    //请求接口
    api: {
      type: String,
    },

    //请求参数
    data: {
      type: Object,
      default: function () {
        return {};
      }
    },

    //meta信息
    meta: {
      type: Object,
      default: function () {
        return {
          page: 1,
          limit: 25
        }
      }
    }
  },

  data () {
    return {
    	options: {
    		vertical: true,
    		property: "translateY",
        maxSpeed: 2,
        outFactor: 0.2,
        lockDirection: false
    	},
    	max: 0,
      items: [],
    	min: -window.innerHeight,
    	loading: false,
      hasNext: true,
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
  	onChange(v) {
  		if (v <= this.min + 5 && !this.loading) {
        this.loading = true;
        this.getData();
      }
  	},

  	getData() {
      if(!this.hasNext) {
        this.$toast('没有更多了！');

        setTimeout(() => {
          this.loading = false;
        }, 500)

        return;
      }

      let data = Object.assign({}, this.data, this.meta);

      post(this.api, data).then(r=>{
        this.items = this.items.concat(r.data.list);
        this.resetMin();
        this.genMeta(r.data.meta);

        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }).catch(r=>{
        console.log(3)
        this.$toast(r.message);
      })
  	},

  	resetMin() {
  		const list = this.$refs.listContent,
  				wrap = this.$refs.wrap;

  		this.min = parseInt(getComputedStyle(wrap).height) - parseInt(getComputedStyle(list).height);
  	},

    genMeta(meta) {
      this.meta.page = meta.page + 1;

      if (meta.page >= meta.pages) {
        this.hasNext = false;
        this.$refs.loading.remove();
      }
    }
  }
};
</script>
<style>
.m-list{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="scss" scoped>
.list-content{
	width: 100%;
}

.list-ul{
  width: 100%;
	display: flex;
	flex-wrap:wrap;
}

.loading-more{
	display: block; 
	line-height: 50px;
	height: 50px;
	text-align: center;
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
  background-image: url(loading.png);
  background-size: 20px 20px;
  width: 20px;
  height: 20px;
  -webkit-animation: rotate 1.6s step-start infinite;
  animation: rotate 1.6s step-start infinite;
  display:inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
</style>