<template>
  <div>
    <!-- 添加业务对话框-->
    <el-dialog
      title="添加业务"
      :visible.sync="visible"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="银行名称" prop="bankName">
          <el-input
            v-model="addForm.bankName"
            placeholder="请输入银行名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-input
            v-model="addForm.businessName"
            placeholder="请输入业务名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddService",
  data() {
    return {
      visible: false,
      addForm: {
        bankName: "",
        businessName: "",
      },
      // 添加业务的校验
      addFormRules: {
        bankName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        businessName: [
          { required: true, message: "请输入业务名称号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleOk() {
      this.$refs.addFormRef.validate((vaild) => {
        this.$message.success("添加成功");
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        console.log("1", this.addForm);
        // addUser()
        this.visible = false;
      });
    },
  },
};
</script>

<style>
</style>