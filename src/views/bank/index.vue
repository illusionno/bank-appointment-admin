<template>
  <div class="bankList">
    <!-- 搜索与添加 -->
    <div class="search-row">
      <el-form :inline="true" v-model="queryInfo">
        <el-form-item label="银行名称:">
          <el-input
            placeholder="请输入银行名称"
            clearable
            v-model.trim="queryInfo.bankName"
            @change="handleSearch"
            style="width: 150px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            v-model="queryInfo.status"
            clearable
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="可预约" :value="0"></el-option>
            <el-option label="不能预约" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="my-btn"
            @click="handleSearch"
            icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
        <el-button
          class="my-btn"
          type="warning"
          plain
          @click="showAddBank"
          icon="el-icon-plus"
          >添加银行</el-button
        >
      </el-form>
    </div>
    <!-- 银行列表 -->
    <el-table :data="bankData" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="bankCode" label="银行编号"></el-table-column>
      <el-table-column prop="address" label="银行地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#917ccb"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="contactsName" label="联系人"></el-table-column>
      <el-table-column
        prop="contactsPhone"
        label="联系人电话"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="删除时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            plain
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdateBank"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteBankById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="my-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 3, 5, 7]"
      :page-size="100"
      layout="total, sizes, prev, pager, next"
      :total="this.bankData.length"
    >
    </el-pagination>

    <!-- 添加银行对话框 -->
    <AddBank ref="addBank" @refresh="refresh"></AddBank>
    <!-- 编辑用户对话框 -->
    <UpdateBank ref="updateBank"></UpdateBank>
  </div>
</template>

<script>
import { getBank, deleteBank } from "@/api/bank.js";
import AddBank from "./module/AddBank";
import UpdateBank from "./module/UpdateBank.vue";
const data = [
  {
    id: 1,
    bankName: "中国银行",
    bankCode: "1111",
    address: "江苏省南京市xx",
    status: true,
    contactsName: "王刚",
    contactsPhone: "15167238498",
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
  {
    id: 2,
    bankName: "中国建设银行",
    bankCode: "1131",
    address: "江苏省南京市xx",
    status: false,
    contactsName: "刘刚",
    contactsPhone: "15147238498",
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
];
export default {
  components: {
    AddBank,
    UpdateBank,
  },
  data() {
    return {
      data,
      bankData: [],
      // 当前页数
      page: 1,
      // 当前每页显示多少数据
      limit: 5,
      // 查询参数
      queryInfo: {
        bankName: "",
        status: "",
      },
    };
  },
  created()
  {
    this.getBankList()
  },
  methods: {
    //请求银行列表
    getBankList() {
      getBank(this.page, this.limit, this.queryInfo)
        .then((res) => {
          if (res.data.code === 200) {
              this.bankData = res.data.data.records;
              this.bankData.forEach((item) => {
                item.createTime = this.$moment(item.createTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                item.updateTime = this.$moment(item.updateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
          // 0可预约 1不可预约
          item.status = item.status == 0 ? true : false;
              });
            } else {
              this.$message.error("请求失败");
            }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过关键词搜索
    handleSearch() {
      this.getBankList();
    },
    // 监听pagesize事件
    handleSizeChange(val) {
      this.page = val;
      this.getBankList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.limit = val;
      this.getBankList();
    },
    //显示添加银行对话框
    showAddBank() {
      this.$refs.addBank.visible = true;
    },
    // 显示编辑用户对话框
    showUpdateBank() {
      this.$refs.updateBank.visible = true;
    },
    // 通过id删除银行
    async deleteBankById(id) {
      const confirmResult = await this.$confirm("确定要删除该银行吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      // 用户确认删除, 返回字符串confirm
      // 用户取消删除, 返回字符串cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }
      deleteBank(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getBankList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    refresh()
    {
      this.getBankList()
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.bankList {
  margin: 25px;
}
</style>
