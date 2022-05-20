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
      const validateStatus = this.rules.reduce((pre, cur) => {
        // 遍历rules,rules中的每一个都是一个{}对象，用cur.test取到当前对象的test方法，cur.message为当前子规则里的错误信息
        const check = cur && cur.test && cur.test(this.value)
        console.log('cur', this.value)
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
