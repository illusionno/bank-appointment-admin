<template>
  <div>
    <el-dialog
      title="修改预约"
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
          <el-select
            v-model="editForm.bankName"
            placeholder="请选择"
            @change="bankNameChange"
          >
            <el-option
              v-for="(item,index) in allBank"
              :label="item"
              :value="item"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-select
            v-model="editForm.businessName"
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
            v-model="editForm.userName"
            placeholder="请输入预约人"
          ></el-input>
        </el-form-item>

        <el-form-item label="预约时间" prop="appointmentTime">
          <el-date-picker
            v-model="editForm.appointmentTime"
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
import { getRefundsByName, updateBook } from "@/api/book.js";

export default {
  name: "UpdateBook",
  props: {
    allBank: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      editForm: {},
      // 业务
      businessList: [],
      // 添加银行的校验
      editFormRules: {
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
    edit(data) {
      console.log("p", data);
      this.editForm = data;
    },
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
      // this.$refs.editFormRef.resetFields();
    },
    handleOk() {
      this.$refs.editFormRef.validate(vaild => {
        if (!vaild) {
          return this.$message.error("添加失败,请重新填写!");
        }
        console.log("pst", this.editForm);
        let data = {
          bankName: this.editForm.bankName,
          businessName: this.editForm.businessName,
          userName: this.editForm.userName,
          appointmentTime: Date.parse(new Date(this.editForm.appointmentTime)),
          id: this.editForm.id
        };
        updateBook(data).then(res => {
          if (res.data.code === 200) {
            this.$message.success("更改成功");
            this.visible = false;
            this.$emit('refresh')
          } else {
            this.$message.error("更改失败");

          }
        })
          .catch(err =>
          {
          console.log(err);
        })


      });
    }
  }
};
</script>

<style></style>
