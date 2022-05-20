<template>
  <div class="test-wrapper">
    <list-layout>
      <template slot="header">
        <div>
          <directive-permission />
        </div>
        <div>头部表格</div>
        <al-table
          :column="formData.column"
          :data="formData.list"
          :pagination="true"
        />
      </template>
      <template slot="content">
        <div>中间模块</div>
        <my-form />
      </template>

      <template slot="footer">
        <div>尾部模块</div>
        <el-button type="primary" @click="hideControll">展示数据</el-button>
        <el-button type="success" @click="hideControll">隐藏数据</el-button>

        <el-table v-show="isHide" :data="tableData" style="width: 100%" stripe="">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </template>
    </list-layout>
  </div>
</template>

<script>
import { getTestList } from '@/api/test.js'
import ListLayout from '@/components/ListLayout/index.vue'
import AlTable from '@/components/AlTable/index.vue' // import的组件名字要和下面注册的组件名字一致
// import Conditions from "./components/conditions/index.vue";
import DirectivePermission from '@/views/permission/directive.vue'
import MyForm from '@/views/form/index.vue'

export default {
  components: {
    ListLayout,
    AlTable,
    DirectivePermission,
    MyForm
    // Conditions,
  },
  data() {
    return {
      formData: {
        column: [
          {
            prop: 'nick',
            label: '昵称'
          },
          {
            prop: 'phone',
            label: '手机号'
          },
          {
            prop: 'name',
            label: '真实姓名'
          },
          {
            prop: 'subject',
            label: '所属学科'
          },
          {
            prop: 'job',
            label: '职位'
          },
          {
            prop: 'year',
            label: '工作年限'
          },
          {
            prop: 'updateTime',
            label: '录入时间'
          },
          {
            prop: 'actions',
            label: '操作',
            render(_, scope) {
              return (
                <div>
                  <el-button>操作</el-button>
                  <el-button>操作</el-button>
                </div>
              )
            }
          }
        ],
        list: []
      },
      tableData: [],
      isHide: false
    }
  },
  created() {
    getTestList().then((res) => {
      const { code, data } = res
      if (Number(code) === 20000) {
        const { items, total, tableData } = data
        this.formData.list = items
        this.tableData = tableData
      }
      console.log('test', res)
    })
  },
  methods: {
    hideControll() {
      this.isHide = !this.isHide
      console.log(this.isHide)
    }
  }
}
</script>

<style>
</style>
