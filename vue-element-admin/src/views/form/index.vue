<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <s-validate #default="{ validate }" :rules="rules" :value="form.name">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" @blur="validate" />
        </el-form-item>
      </s-validate>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <s-validate #default="{ validate }" :rules="textRules" :value="form.desc">
        <el-form-item label="Activity form">
          <el-input v-model="form.desc" type="textarea" @blur="validate" />
        </el-form-item>
      </s-validate>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SValidate from '@/views/renderless/svalidate.vue'
export default {
  components: {
    SValidate
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
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
      ]
    }
  },
  methods: {
    onSubmit() {
      if (this.form.name && this.form.region && this.form.date1 && this.form.date2 &&
      this.form.delivery && this.form.type && this.form.resource && this.form.desc) { this.$message('submit!') } else {
        this.$message('还有未填项,无法创建成功')
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

