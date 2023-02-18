<template>
  <div>
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
        <el-form-item label="银行S名称" prop="bankName">
          <el-select v-model="editForm.bankName" placeholder="请选择">
            <el-option
              v-for="item in allBank"
              :label="item"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务名称" prop="businessName">
          <el-input
            v-model.trim="editForm.businessName"
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
import { updateService } from "@/api/service.js";

export default {
  name: "UpdateService",
  props: {
    allBank: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      editForm: {
        bankName: "",
        businessName: ""
      },
      // 添加业务的校验
      editFormRules: {
        bankName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        businessName: [
          { required: true, message: "请输入业务名称号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    edit(data) {
      console.log(data);
      this.editForm = data;
    },
    handleClose() {
      this.visible = false;
    },
    handleOk() {
      this.$refs.editFormRef.validate(vaild => {
        if (!vaild) {
          return this.$message.error("更新失败,请重新填写!");
        }
        let data = {
          bankName: this.editForm.bankName,
          businessName: this.editForm.businessName,
          id:this.editForm.id
        };
        updateService(data).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.$message.success("更新成功");
            this.visible = false;
            this.$emit("refresh");
          } else {
            this.$message.error("更新失败");
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
