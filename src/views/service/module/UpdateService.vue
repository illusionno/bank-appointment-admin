<template>
  <div>
    <!-- 添加业务对话框-->
    <el-dialog
      title="更新业务"
      :visible.sync="visible"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="银行名称" prop="bankName">
          <el-input
            v-model="editForm.bankName"
            placeholder="请输入银行名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-input
            v-model="editForm.businessName"
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
  name: "UpdateService",
  data() {
    return {
      visible: false,
      editForm: {
        bankName: "",
        businessName: "",
      },
      // 添加业务的校验
      editFormRules: {
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
    edit(data) {
      console.log(data);
    },
    handleClose() {
      this.visible = false;
    },
    handleOk() {
      this.$refs.editFormRef.validate((vaild) => {
        this.$message.success("添加成功");
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        console.log("1", this.editForm);
        // addUser()
        this.visible = false;
      });
    },
  },
};
</script>

<style>
</style>