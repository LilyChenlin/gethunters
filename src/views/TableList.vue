<template>
  <div class="cat-table-list">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>简历管理</el-breadcrumb-item>
      <el-breadcrumb-item>简历列表</el-breadcrumb-item>
    </el-breadcrumb>
      <br />
      <el-row>
          <div class="tablestatus">
              待业:<div class="status1"></div>
              未离职:<div class="status2"></div>
              办理中:<div class="status3"></div>
              其它:<div class="status4"></div>
          </div>
      </el-row>
      <br />
    <el-row :gutter="10">
      <el-col v-for="(t,i) of tableList" :key="i" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">
        <cat-table :data="t"></cat-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Table from "../components/Table";
export default {
  data() {
    return {
      //tableList: []
        //模拟数据
        tableList: [
            { tid: 1, tname: '林主明-前端', status: 4 },
            { tid: 2, tname: '刘迪兴_软件测试__6年', status: 3 },
            { tid: 3, tname: '钱春宏', status: 3 },
            { tid: 4, tname: '智联招聘_李曌', status: 4 },
            { tid: 5, tname: '熊潘 大数据简历', status: 2 },
            { tid: 6, tname: '张三-前端', status: 1 },
            { tid: 7, tname: '李四_软件测试', status: 1 },
            { tid: 8, tname: '王五', status: 3 },
            { tid: 9, tname: '二狗子', status: 2 },
            { tid: 10, tname: '曾闯', status: 4 },
            { tid: 11, tname: '汤姆', status: 2 },
            { tid: 12, tname: '杰瑞', status: 3 },
            { tid: 13, tname: '丁丁', status: 2 }
        ]
    };
  },
  mounted() {
    // 加载桌台列表
      /*
    var url = this.$store.state.globalSettings.apiUrl + "/admin/table";
    this.$axios
      .get(url)
      .then(({ data }) => {
        this.tableList = data;
      })
      .catch(err => {
        console.log(err);
      });
      */
  },
  components: {
    "cat-table": Table
  }
};
</script>

<style lang="scss">
    .tablestatus{
        display:flex;
        div {
            width: 40px;
            height: 20px;
            margin: 0 10px;
        }
    .status1 {
        background: #67C23A;
    }
    .status2 {
        background: #E6A23C;
    }
    .status3 {
        background: #E56C6C;
    }
    .status4 {
        background: #909399;
    }
    }
</style>