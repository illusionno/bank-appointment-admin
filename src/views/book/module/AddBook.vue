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
          <el-select
            v-model="addForm.bankName"
            placeholder="请选择"
            @change="bankNameChange"
          >
            <el-option
              v-for="item in allBank"
              :label="item"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-select
            v-model="addForm.businessName"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in businessList"
              :label="item.businessName"
              :value="item.businessName"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约人" prop="userName">
          <el-input
            v-model="addForm.userName"
            placeholder="请输入预约人"
          ></el-input>
        </el-form-item>

        <el-form-item label="预约时间" prop="appointmentTime">
          <el-date-picker
            v-model="addForm.appointmentTime"
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
import { getRefundsByName, addBook } from "@/api/book.js";

export default {
  name: "AddBook",
  props: {
    allBank: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      addForm: {
        bankName: "",
        businessName: "",
        userName: "",
        appointmentTime: ""
      },
      // 业务
      businessList: [],
      // 添加银行的校验
      addFormRules: {
        bankName: [
          { required: true, message: "请选择银行", trigger: "change" }
        ],

        businessName: [
          { required: true, message: "请选择业务", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        appointmentTime: [
          { required: true, message: "请选择预约时间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    bankNameChange(val) {
      let data = {
        bankName: val
      };
      getRefundsByName(data).then(res => {
        if (res.data.code === 200) {
          this.businessList = res.data.data.data;
        }
      });
    },

    handleClose() {
      this.visible = false;
      // 清空表单内容
      // this.$refs.addFormRef.resetFields();
    },
    handleOk() {
      this.$refs.addFormRef.validate(vaild => {
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        let data = {
          ...this.addForm,
          appointmentTime: Date.parse(new Date(this.addForm.appointmentTime))
        }
        addBook(data).then(res => {
          if (res.data.code === 200) {
            this.$message.success("添加成功");
            this.visible = false;
            this.$emit('refresh')
          } else {
            this.$message.error("添加失败");
          }
        }).catch(err =>
        {
          console.log(err);
        });
      });
    }
  }
};
</script>

<style></style>
