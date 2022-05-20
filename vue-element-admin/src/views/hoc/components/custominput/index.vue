<template>
  <div>
    <!-- //对通过prop接受的值,通过v-mdel进行双向绑定 -->
    <el-input v-model="value" @blur="onBlur" />
  </div>
</template>

<script>
export default {
  props: {
    initValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: this.initValue
    }
  },
  methods: {
    onBlur() {
      this.$emit('blur', this.value)
    }
  }
}
</script>

<style>
</style>
