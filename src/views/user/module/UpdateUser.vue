<template>
  <div>
    <!-- 编辑用户对话框-->
    <el-dialog
      title="编辑用户"
      :visible.sync="visible"
      width="45%"
      @close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
      >
      <el-form-item label="用户id" width="300px">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
           <el-form-item label="用户名" prop="userName" width="300px">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" disabled width="300px">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select v-model="editForm.certificatesType" placeholder="请选择">
            <!-- <el-option
            v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            > -->
            <el-option label="身份证" :value="1"></el-option>
            <el-option label="其他证件" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="certificatesNo">
          <el-input v-model="editForm.certificatesNo"></el-input>
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
import { updateUser } from "@/api/userManage.js";
export default {
  name: "UpdateUser",
  data() {
    // 验证手机号规则
    let checkPhone = (rule, value, cb) => {
      const regTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regTel.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    // let validatePass2 = (rule, value, callback) => {
    //   if (value !== this.editForm.passWord) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      visible: false,
      // options: [
      //   {
      //     value: 1,
      //     label: "身份证号"
      //   },
      //   {
      //     value: 2,
      //     label: "其他证件"
      //   }
      // ],
      editForm: {
        userName:"",
        name: "",
        phone: "",
        passWord: "",
        checkPass: "",
        certificatesType: this.certificatesType == 1?'身份证':'其他证件',
        certificatesNo: ""
      },
      // 添加用户的校验
      editFormRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 7,
            message: "用户名长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 4,
            message: "姓名长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        phone:[
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        // passWord: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   {
        //     min: 6,
        //     max: 15,
        //     message: "密码长度在 6 到 15 个字符",
        //     trigger: "blur",
        //   },
        // ],
        // checkPass: [
        //   { required: true, message: "请再次输入密码", trigger: "blur" },
        //   { validator: validatePass2, trigger: "blur" },
        // ],
        certificatesType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        // 校验？
        certificatesNo: [
          { required: true, message: "请输入证件号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    edit(record) {
      console.log(record);
      this.editForm = record;
    },
    handleClose() {
      this.visible = false;
    },
    // 提交
    handleOk() {
      this.$refs.editFormRef.validate(vaild => {
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        console.log('editForm', this.editForm);
        updateUser(this.editForm).then(res =>
        {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("添加成功");
            this.$emit('refresh')
          }
        })
          .catch(err =>
          {
          console.log(err);
        })
        this.visible = false;
      });
    }
  }
};
</script>

<style></style>
