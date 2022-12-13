<template>
  <div>
    <!-- 添加银行对话框-->
    <el-dialog
      title="添加预约"
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
          <el-select v-model="addForm.bankName" placeholder="请选择">
            <el-option label="中国银行" :value="1"></el-option>
            <el-option label="建设银行" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessBank">
          <el-select v-model="addForm.businessBank" placeholder="请选择">
            <el-option label="取钱" :value="1"></el-option>
            <el-option label="存钱" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约人" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="预约时间" prop="appointmentTime">
          <el-date-picker
            v-model="addForm.appointmentTim"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
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
  data() {
    return {
      visible: false,
      addForm: {
        bankName: "",
        businessBank: "",
        userName: "",
        appointmentTime: "",
      },
      // 添加银行的校验
      addFormRules: {
        bankName: [
          { required: true, message: "请选择银行", trigger: "change" },
        ],

        businessBank: [
          { required: true, message: "请选择业务", trigger: "change" },
        ],
        userName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        appointmentTime: [
          { required: true, message: "请选择预约时间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
      // 清空表单内容
      // this.$refs.addFormRef.resetFields();
    },
  },
};
</script>

<style>
</style>