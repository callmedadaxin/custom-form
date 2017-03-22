<template>
  <img :src="url" :alt="alt">
</template>

<script>
import { preLoad } from 'common/js/base';

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    placeHolder: String,
    alt: String
  },

  data () {
    return {
      resultUrl: null,
      defaultPlaceHolder: '',
    };
  },

  computed: {
    url: function  {
      return this.resultUrl || this.placeHolder || this.defaultPlaceHolder;
    }
  },

  mounted() {
    preLoad(this.src).then(img=>{
      this.resultUrl = img.src;
    })
  }
};
</script>
