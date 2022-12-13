<template>
  <div>
    <!-- 添加用户对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="visible"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input
            v-model="addForm.passWord"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="addForm.checkPass"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select v-model="addForm.certificatesType" placeholder="请选择">
            <el-option label="身份证" :value="1"></el-option>
            <el-option label="其他" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="certificatesNo">
          <el-input v-model="addForm.certificatesNo"></el-input>
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
// import {addUser } from "@/api/userManage.js";
export default {
  name: "AddUser",
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
    let validatePass2 = (rule, value, callback) => {
      if (value !== this.addForm.passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      // 确认密码（不传参）
      addForm: {
        userName: "",
        name: "",
        phone: "",
        passWord: "",
        checkPass: "",
        certificatesType: "",
        certificatesNo: "",
      },
      // 添加用户的校验
      addFormRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 7,
            message: "用户名长度在 3 到 7 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 4,
            message: "姓名长度在 2 到 4 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
        certificatesType: [
          { required: true, message: "请选择证件类型", trigger: "change" },
        ],
        // 校验？
        certificatesNo: [
          { required: true, message: "请输入证件号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      // 清空表单内容
      this.$refs.addFormRef.resetFields();
      this.visible = false;
    },
    // 提交
    handleOk() {
      this.$refs.addFormRef.validate((vaild) => {
        console.log("1", this.addForm);
        this.$message.success("添加成功");
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        // addUser()
        this.visible = false;
      });
    },
  },
};
</script>

<style>
</style>
