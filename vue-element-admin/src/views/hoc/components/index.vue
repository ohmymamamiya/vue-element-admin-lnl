<template>
  <div>
    <HocCustomCom :value="value" :rules="rules" />
  </div>
</template>

<script>
import HocFunc from './custominput/hoc'
import Custominnput from './custominput/index.vue'// import Custominnput from "./custominput/textarea.vue";可以进行组件类似的复用
const HocCustomCom = HocFunc(Custominnput)
export default {
  components: {
    HocCustomCom
  },
  data() {
    return {
      value: '',
      rules: [
        {
          test: function(value) {
            return /\d+/.test(value)
          },
          message: '请输入一个数字'
        }
      ]
    }
  }
}
</script>

<style>
</style>
