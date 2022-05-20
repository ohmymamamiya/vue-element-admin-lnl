<template>
  <div>
    <slot :validate="validate" />
    {{ errMsg }}
  </div>
</template>

<script>
export default {
  props: ['rules', 'value'],
  data() {
    return {
      errMsg: ''
    }
  },
  methods: {
    validate() {
      const validateStatus = this.rules.reduce(
        (pre, cur) => {
          const check = cur && cur.test && cur.test(this.value)
          this.errMsg = check ? '' : cur.message
          return pre && cur
        }, true)
      return validateStatus
    }
  }
}
</script>

<style>
</style>
