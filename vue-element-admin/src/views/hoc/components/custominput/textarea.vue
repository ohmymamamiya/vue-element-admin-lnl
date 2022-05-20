<template>
  <div>
    <textarea v-model="initValue" @blur="onBlur" />
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
