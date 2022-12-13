<template>
  <div>
    <!-- 添加银行对话框-->
    <el-dialog
      title="添加银行"
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
          <el-input v-model="addForm.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行编号" prop="bankCode">
          <el-input v-model="addForm.bankCode"></el-input>
        </el-form-item>
        <el-form-item label="银行地址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="addForm.status" placeholder="请选择">
            <el-option label="可预约" :value="1"></el-option>
            <el-option label="不可预约" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contactsName">
          <el-input v-model="addForm.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contactsPhone">
          <el-input v-model="addForm.contactsPhone"></el-input>
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
  name: "AddBank",
  data() {
    // 验证手机号规则
    let checkPhone = (rule, value, cb) => {
      const regTel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regTel.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      visible: false,
      addForm: {
        bankName: "",
        bankCode: "",
        address: "",
        status: "",
        contactsName: "",
        contactsPhone: "",
      },
      // 添加银行的校验
      addFormRules: {
        bankName: [
          { required: true, message: "请输入业务名称", trigger: "blur" },
        ],
        bankCode: [
          { required: true, message: "请输入银行编号", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入银行地址", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        contactsName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        contactsPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
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
    // 提交
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