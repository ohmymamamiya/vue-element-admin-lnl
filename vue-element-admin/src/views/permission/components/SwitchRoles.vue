<template>
  <div>
    <div style="margin-bottom: 15px">
      Your roles: <b>{{ roles }}</b>
    </div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        console.log(this.roles[0])
        return this.roles[0]
      },
      set(val) {
        // store/user.js中的changeRoles
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
