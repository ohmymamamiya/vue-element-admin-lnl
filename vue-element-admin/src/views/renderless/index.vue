<template>
  <div>
    <el-form label-width="100px" :model="ruleForm">
      <s-validate #default="{ validate }" :rules="rules" :value="ruleForm.name">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name" @blur="validate" />
          {{ ruleForm.name }}
        </el-form-item>
      </s-validate>

      <s-validate
        #default="{ validate }"
        :rules="regionRules"
        :value="ruleForm.region"
      >
        <el-form-item label="活动区域" prop="region">
          <el-select
            v-model="ruleForm.region"
            placeholder="请选择活动区域"
            @change="validate"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
          {{ ruleForm.region }}
        </el-form-item>
      </s-validate>

      <s-validate #default="{ validate }" :rules="textRules" :value="ruleForm.desc">
        <el-form-item label="活动形式" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" @blur="validate" />
          {{ ruleForm.desc }}
        </el-form-item>
      </s-validate>

    </el-form>
  </div>
</template>

<script>
import SValidate from './svalidate.vue' // 该组件为index.vue的子组件
export default {
  components: {
    SValidate
  },
  data() {
    return {
      value: '',
      ruleForm: {
        name: '',
        region: '区域一',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: [
        {
          test: function(value) {
            console.log('current value:', value)
            return /\d+/.test(value)
          },
          message: '请输入一个数字'
        }
      ],
      textRules: [
        {
          test: function(value) {
            console.log('current region:', value)
            return value
          },
          message: '请填写活动形式'
        }
      ],

      regionRules: [
        {
          test: function(value) {
            console.log('current region:', value)
            return value
          },
          message: '选择错误'
        }
      ]
    }
  }
}
</script>

<style>
</style>
