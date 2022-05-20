<template>
  <div class="dc-table-wrapper">
    <el-table
      ref="elTable"
      v-bind="$attrs"
      :data="data"
      :span-method="this.merge ? this.mergeMethod : this.spanMethod"
      :header-cell-style="getRowClass"
      v-on="$listeners"
    >
      <dc-column
        v-for="(item, index) in column"
        :key="index"
        v-bind="$attrs"
        :column="item"
      />
      <!-- @slot 自定义 empty 内容 -->
      <template slot="empty" class="empty-wrapper">
        <template>
          <img src="./assets/no-data.png">
          <div class="no-data-text">{{ emptyText }}</div>
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      class="dc-pagination-wrapper"
      v-bind="$attrs"
      :style="{ 'margin-top': paginationTop, 'text-align': paginationAlign }"
      v-on="$listeners"
      @current-change="paginationCurrentChange"
    />
  </div>
</template>

<script>
/**
 * 表格
 * @displayName Table
 */
import DcColumn from './lb-column.vue'

export default {
  name: 'LbTable',
  components: {
    DcColumn
  },
  props: {
    /**
     * 表格纵向列元素的数组合集
     * @values [{
     * }]
     */
    column: {
      type: Array,
      default: () => []
    },
    /**
     * 表格的数据源展示
     * @values Array
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * 合并单元格
     *  @values Function
     */
    spanMethod: {
      type: Function
    },
    /**
     * 分页
     * @values true | false
     */
    pagination: {
      type: Boolean,
      default: false
    },
    /**
     * 分页控件距离顶部的距离
     * @values string
     */
    paginationTop: {
      type: String,
      default: '20px'
    },
    /**
     * 分页布局对齐位置
     *  @values top | left | bottom | right
     */
    paginationAlign: {
      type: String,
      default: 'right'
    },
    /**
     * 表格合并数组
     * @values Array
     */
    merge: Array,
    /**
     * 数据源为空时文案展示
     */
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    emptyCustom: {
      type: String
    }
  },
  data() {
    return {
      mergeLine: {},
      mergeIndex: {}
    }
  },
  computed: {
    dataLength() {
      return this.data.length
    }
  },
  watch: {
    merge() {
      this.getMergeArr(this.data, this.merge)
    },
    dataLength() {
      this.getMergeArr(this.data, this.merge)
    }
  },
  created() {
    this.getMergeArr(this.data, this.merge)
  },
  methods: {
    // 头部样式
    getRowClass({ rowIndex }) {
      if (rowIndex === 0) {
        return 'background:#ECF1F6;color:#29344E;font-size:14px;font-weight:500;height: 54px;padding: 5px 0;border-radius: 2px 2px 0px 0px;'
      }
      return ''
    },
    clearSelection() {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.elTable.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.elTable.doLayout()
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order)
    },
    paginationCurrentChange(val) {
      this.$emit('p-current-change', val)
    },
    getMergeArr(tableData, merge) {
      if (!merge) return
      this.mergeLine = {}
      this.mergeIndex = {}
      merge.forEach((item) => {
        tableData.forEach((data, i) => {
          if (i === 0) {
            this.mergeIndex[item] = this.mergeIndex[item] || []
            this.mergeIndex[item].push(1)
            this.mergeLine[item] = 0
          } else if (data[item] === tableData[i - 1][item]) {
            this.mergeIndex[item][this.mergeLine[item]] += 1
            this.mergeIndex[item].push(0)
          } else {
            this.mergeIndex[item].push(1)
            this.mergeLine[item] = i
          }
        })
      })
    },
    // eslint-disable-next-line consistent-return
    mergeMethod({ column, rowIndex }) {
      const index = this.merge.indexOf(column.property)
      if (index > -1) {
        // eslint-disable-next-line no-underscore-dangle
        const _row = this.mergeIndex[this.merge[index]][rowIndex]
        // eslint-disable-next-line no-underscore-dangle
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    uploadFile() {
      this.$emit('uploadFile')
    }
  }
}
</script>

<style lang="scss">
$primary-color: #29344e;
$column-color: #d6dde7;
$text-color: #29344e;
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $primary-color;
}
.dc-table-wrapper {
  // table外边框
  .el-table {
    /* cursor: pointer; */
    width: 100%;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #29344e;
    .cell {
      margin-left: 20px;
    }
  }
  .el-table th > .cell {
    margin-left: 20px;
  }
  // 设置无数据样式
  .el-table__empty-text {
    display: block;
    width: 100%;
    height: auto;
    padding: 132px 0 157px;
    font-size: 14px;
    line-height: 20px;
    img {
      margin-bottom: 0px;
      width: 86px;
      height: 100px;
    }
    .noFileImg {
      width: 60px;
      height: 60px;
      margin-bottom: 5px;
    }
    .addFileBtn {
      margin-top: 20px;
    }
    .empty-text {
      color: rgba(41, 52, 78, 0.85);
      span {
        color: $primary-color;
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
    }
  }

  // 排序按钮颜色修改
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: $primary-color;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: $primary-color;
  }
  .el-table__row > td {
    border: none;
    border-top: 1px solid $column-color;
  }
  .el-table--fit {
    border-bottom: 1px solid $column-color;
  }
  .el-table th.is-leaf {
    border-bottom: 0;
  }
  // 表格底线设置透明
  .el-table::before,
  el-table::after {
    height: 0px;
  }
  .el-table__row {
    .el-checkbox {
      width: 14px;
      height: 14px;
    }
    .el-table-column--selection {
      .el-checkbox {
        position: absolute;
        top: 50%;
        transform: translate(0, -75%);
        right: 5px;
      }
    }
  }

  // 分页样式
  .dc-pagination-wrapper {
    margin-bottom: 20px;
    // 总数
    .total {
      font-size: 14px;
      font-family: Helvetica;
      color: #eff4fa;
    }
  }
  .el-button+.el-button {
  margin-left: 0px;
}
}
// 每页个数
.el-pagination .el-select .el-input {
  width: 88px;
  height: 32px;
  margin: 0;
}
.el-input--mini .el-input__inner {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
.el-pagination .el-input__suffix {
  height: 32px;
  line-height: 32px;
}

// 切换页面
.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
  height: 32px;
  line-height: 32px;
}
.el-pagination.is-background .btn-next {
  margin: 0 0 0 5px;
}
.el-pagination.is-background .btn-prev {
  margin: 0 5px 0 0;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  min-width: 32px;
}
.el-pagination.is-background .el-pager li {
  min-width: 32px;
  height: 32px;
  line-height: 32px;
}
.el-pagination__editor.el-input .el-input__inner {
  height: 32px;
}
.el-table__fixed-right-patch {
  background-color: rgb(236, 241, 246);
}
.el-table__fixed-right:before,
.el-table__fixed:before {
  background-color: white;
}
.el-table__fixed-right {
  background-color: #fff;
}
// 修改列表选中颜色样式
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #29334e;
  border-color: #29334e;
}
</style>
