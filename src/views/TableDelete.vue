<template>
    <div class="cat-table-list">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">home</el-breadcrumb-item>
            <el-breadcrumb-item>two</el-breadcrumb-item>
            <el-breadcrumb-item>delete</el-breadcrumb-item>
        </el-breadcrumb>
        <br />
        <el-form :model="ruleForm" label-width="50px">
            <el-form-item label="tid">
                <el-input type="number" v-model="ruleForm.tid" autocomplete="off" style="width:80px"></el-input>
            </el-form-item>            
            
            <el-form-item label="tname">
                <el-input type="text" v-model="ruleForm.tname" autocomplete="off"></el-input>
            </el-form-item>
    
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleForm)">submit</el-button>
                <el-button @click="resetForm">reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
      return {
          ruleForm: {
             tid: '',
             tname:''
          }
      };
        },
        methods: {
            submitForm(ruleForm) {
                if (!ruleForm.tid || !ruleForm.tname) {
                    this.$message.warning("姓名或id不能为空");
                } else {
                    this.$confirm("删除操作不可撤销！您确定吗？", "提示", { type: "warning" }).then(() => {
                    var url = this.$store.state.globalSettings.apiUrl + 'admin/delete'
                    this.$axios.delete(url, ruleForm).then(res => {
                        if (res.data.msg == 200) {
                            this.$message.warning("删除成功");
                            this.ruleForm.tname = ''
                            this.ruleForm.tid = ''
                        } else {
                            this.$message.error("删除失败请检查");
                        }
                    }).catch(err => {
                        console.log(err)
                            })
                    })
                }
            },
            resetForm() {
                this.ruleForm.tname = ''
                this.ruleForm.tid = ''
            }
        }
  }
</script>

<style lang="scss">
</style>