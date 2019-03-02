<template>
    <div class="cat-table-info">
        <el-card shadow="hover">
            <div class="cat-table"
                 :style="{background:getTableColor(data.status)}">{{data.tid}}号：{{data.tname}}</div>
            <el-button type="success" plain size="mini" @click="showTableDetail">详情</el-button>
            <el-button type="danger" plain size="mini" @click="showUpdate">修改</el-button>
        </el-card>

        <!-- 简历详情对话框 -->
        <el-dialog :title="data.tname + ' 简历详情'"
                   :visible="dialogTableDetailVisible"
                   :before-close="closeDialogTableDetail">
            <!-- 对话主体 -->
            <el-tabs type="border-card" @tab-click="makeQRCode">
                <el-tab-pane label="简历类别状态">当前状态：{{data.status | tableStatus}}</el-tab-pane>
                <el-tab-pane label="简历二维码">
                    <img :src="qrcodeData">
                </el-tab-pane>
            </el-tabs>
            <div slot="footer">
                <el-button type="primary" @click="dialogTableDetailVisible=false">确定</el-button>
            </div>
        </el-dialog>

        <!-- 修改简历对话框 -->
        <el-dialog :title="data.tname + ' 简历详情'"
                   :visible="updateDetailVisible"
                   :before-close="closeDialogTableDetail">
            <!-- 对话主体 -->
            <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="简历名称">
                    <el-input type="text" v-model="ruleForm.tname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简历状态">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio label="待业"></el-radio>
                        <el-radio label="未离职"></el-radio>
                        <el-radio label="办理中"></el-radio>
                        <el-radio label="其它"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleForm,data.tid)">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>
<script>
export default {
  data() {
      return {
          ruleForm: {
              tid:this.data.tid,
              tname: this.data.tname,
              status: this.data.status
          },
        dialogTableDetailVisible: false,
        updateDetailVisible:false,
      qrcodeData: "" //Base64编码字符串
    };
  },
  props: ["data"],
  methods: {
      makeQRCode() {
      // 创建二维码——此方法不能在当前组件的mouted中调用，因为绘图必须的canvas在el-dialog中，对话在组件加载时并不在DOM树上
      var qrcode = require("qrcode");
      // 每个桌子对应的URL形如：
      // http://127.0.0.1:8092/#/3
      var tableUrl =
        this.$store.state.globalSettings.apiUrl + "/#/" + this.data.tid;
      // 把绘制得到的图片二进制数据转换为Base64编码字符串
      qrcode.toDataURL(
        tableUrl,
        { width: 350, errorCorrectionLevel: "H" },
        (err, url) => {
           console.log("二维码url");
           console.log(url);
          this.qrcodeData = url;
        }
      );
    },
    closeDialogTableDetail() {
        this.dialogTableDetailVisible = false;
        this.updateDetailVisible = false;
    },
    getTableColor(status) {
      switch (status) {
        case 1:
          return "#67C23A";
        case 2:
          return "#E6A23C";
        case 3:
          return "#E56C6C";
        default:
           return "#909399";
      }
    },
    showTableDetail() {
      // console.log(this.data);当前简历的数据
      this.dialogTableDetailVisible = true;
      },
      showUpdate() {
          this.updateDetailVisible = true;
      },
      submitForm(formName, tid) {
          if (!formName.tname || !formName.status) {
              this.$message.warning("姓名或类别不能为空");
          } else { 
          if (formName.status == '待业') {
              formName.status = 1
          } else if (formName.status == '未离职') {
              formName.status = 2
          } else if (formName.status == '办理中') {
              formName.status = 3
          } else if (formName.status == '其它') {
              formName.status = 4
              }
              formName.tid = tid
              var url = this.$store.state.globalSettings.apiUrl + 'admin/update'
              this.$axios.put(url, formName).then( res => {
                  if (res.data.msg == 200) {
                      this.$message.warning("修改成功");
                  } else {
                      this.$message.error("修改失败请检查")
                  }
              }).catch(err => {
                  console.log(err)
              })
              this.updateDetailVisible = false
          }
      },
      resetForm() {
          this.ruleForm.tname = '',
          this.ruleForm.status = ''
      }
  
  }
};
</script>
<style lang="scss">
.cat-table-info {
  padding: 3px;
  text-align: center;
  .cat-table {
    width: 90%;
    height: 120px;
    line-height: 120px;
    border: 1px solid #aaa;
    border-radius: 50%;
    box-shadow: 3px 4px 5px #666;
    margin: 5px auto;
  }
}
</style>
