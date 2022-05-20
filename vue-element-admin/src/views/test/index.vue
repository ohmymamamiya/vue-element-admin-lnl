<template>
  <div>
    <el-button @click="onClick">click add memory</el-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {

    }
  },
  methods: {
    // 解构，从对应的仓库里拿到相应的属性
    ...mapActions('test', ['addMemoryList']),
    onClick() {
      // 20MB
      const list = new Array(20 * 1024 * 1024)
      this.addMemoryList(list)
    }
  }
}
</script>

<style>
</style>
