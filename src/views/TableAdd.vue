<template>
    <div class="cat-table-list">
        <el-breadcrumb>
            <el-breadcrumb-item to="/main">home</el-breadcrumb-item>
            <el-breadcrumb-item>two</el-breadcrumb-item>
            <el-breadcrumb-item>add</el-breadcrumb-item>
        </el-breadcrumb>
        <br />
        <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="tname">
                <el-input type="text" v-model="ruleForm.tname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="status">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio label="1"></el-radio>
                    <el-radio label="2"></el-radio>
                    <el-radio label="3"></el-radio>
                    <el-radio label="4"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-upload class="upload-demo"
                           drag
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :multiple="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">drag this,or <em>click</em></div>
                </el-upload>
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
              tname: '',
              status:''
          }
      };
        },
        methods: {
            submitForm(ruleForm) {
                if (!ruleForm.tname || !ruleForm.status) {
                    this.$message.warning("姓名或类别不能为空");
                } else {
                    var url = this.$store.state.globalSettings.apiUrl + 'admin/add'
                    this.$axios.post(url, ruleForm).then(res => {
                        if (res.data.code == 200) {
                            this.$message.warning("添加成功");
                            this.ruleForm.tname = ''
                            this.ruleForm.status = ''
                        } else {
                            this.$message.error("添加失败")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            resetForm() {
                this.ruleForm.tname = ''
                this.ruleForm.status = ''
            }
        }
  }
</script>

<style lang="scss">

</style>