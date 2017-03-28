<template>
	<div>
		page2
	</div>
</template>

<script>
export default {
  data () {
    return {
      arr: ['a', 'b', 'c'],
      value: ['a']
    };
  },

  methods: {
    isDidabled(item) {
      let arr = this.value.slice(0);

      arr.splice(arr.indexOf('a'), 1);

      return arr.length >= 1 && value.indexOf(item) >= 0;
    },
  }
};
</script>

<style lang="css" scoped>
</style>