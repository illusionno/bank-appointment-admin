<template>
  <div>
    <el-dialog
      title="更新银行"
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
          <el-input v-model="editForm.bankName"></el-input>
        </el-form-item>
        <el-form-item label="银行编号" prop="bankCode">
          <el-input v-model="editForm.bankCode"></el-input>
        </el-form-item>
        <el-form-item label="银行地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" prop="status">
          <el-select v-model="editForm.status" placeholder="请选择">
            <el-option label="可预约" :value="true"></el-option>
            <el-option label="不可预约" :value="false"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="联系人" prop="contactsName">
          <el-input v-model="editForm.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contactsPhone">
          <el-input v-model="editForm.contactsPhone"></el-input>
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
import { updateBank } from "@/api/bank.js";
export default {
  name: "UpdateBank",
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
      editForm: {
        bankName: "",
        bankCode: "",
        address: "",
        // status: "",
        contactsName: "",
        contactsPhone: "",
      },
      // 添加银行的校验
      editFormRules: {
        bankName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
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
    edit(data) {
      // console.log(data);
      this.editForm = data;
    },
    handleClose() {
      this.visible = false;
      this.editForm = {};
    },
    // 提交
    handleOk() {
      this.$refs.editFormRef.validate((vaild) => {
        this.$message.success("添加成功");
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        this.editForm.status = this.editForm.status == true ? 0 : false;
        delete this.editForm.updateTime;
        delete this.editForm.createTime;
        console.log("提交data", this.editForm);
        // addUser()
        updateBank(this.editForm).then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("更新成功");
            this.$emit("refresh");
          } else {
            this.$message.error("更新失败");
          }
        });
        this.visible = false;
      });
    },
  },
};
</script>

<style>
</style>
