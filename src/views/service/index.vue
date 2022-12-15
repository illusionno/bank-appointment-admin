<template>
  <div class="serviceList">
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
        <el-form-item label="业务名称:">
          <el-input
            placeholder="请输入业务名称"
            clearable
            v-model.trim="queryInfo.businessName"
            @change="handleSearch"
            style="width: 150px"
          >
          </el-input>
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
          @click="showAddService"
          icon="el-icon-plus"
          >添加业务</el-button
        >
      </el-form>
    </div>
    <!--银行业务列表 -->
    <el-table :data="serviceData" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="businessName" label="业务名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间"
        >、
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            plain
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdateService(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteServiceById(scope.row.id)"
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
      :total="this.serviceData.length"
    >
    </el-pagination>
    <!-- 添加业务对话框 -->
    <AddService ref="addService" @refresh="refresh"></AddService>
    <UpdateService ref="updateService"></UpdateService>
  </div>
</template>

<script>
import { getService, deleteService } from "@/api/service.js";
import AddService from "./module/AddService.vue";
import UpdateService from "./module/UpdateService.vue";
const data = [
  {
    id: 1,
    bankName: "中国银行",
    businessName: "办信用卡",
    bankInfoId: 1,
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
  {
    id: 2,
    bankName: "中国建设银行",
    businessName: "存钱",
    bankInfoId: 1,
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
];
export default {
  components: {
    AddService,
    UpdateService,
  },
  data() {
    return {
      data,
      serviceData: [],
      // 当前页数
      page: 1,
      // 当前每页显示多少数据
      limit: 5,
      // 查询参数
      queryInfo: {
        bankName: "",
        businessName: "",
      },
    };
  },
  created() {
    this.getServiceList();
  },
  methods: {
    // 获取业务列表
    getServiceList() {
      let data = {
        businessName: this.queryInfo.businessName,
      };
      getService(this.page, this.limit, data)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.serviceData = res.data.data.records;
            this.serviceData.forEach((item) => {
              item.createTime = this.$moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.updateTime = this.$moment(item.updateTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
          } else {
            this.$message.error("请求失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //请求银行列表
    // getBankList() {
    //   getBank(this.page, this.limit, this.queryInfo)
    //     .then((res) => {
    //       if (res.data.code === 200) {
    //         this.bankData = res.data.data.records;
    //         this.bankData.forEach((item) => {
    //           item.createTime = this.$moment(item.createTime).format(
    //             "YYYY-MM-DD HH:mm:ss"
    //           );
    //           item.updateTime = this.$moment(item.updateTime).format(
    //             "YYYY-MM-DD HH:mm:ss"
    //           );
    //           // 0可预约 1不可预约
    //           item.status = item.status == 0 ? true : false;
    //         });
    //       } else {
    //         this.$message.error("请求失败");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 通过关键词搜索
    handleSearch() {
      this.getServiceList();
    },
    // 监听pagesize事件
    handleSizeChange(val) {
      this.page = val;
      this.getServiceList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.limit = val;
      this.getServiceList();
    },
    //显示添加业务对话框
    showAddService() {
      this.$refs.addService.visible = true;
    },
    //显示更新业务对话框
    showUpdateService(record) {
      this.$refs.updateService.visible = true;
      this.$refs.updateService.edit(record);
    },
    // 通过id删除业务
    async deleteServiceById(id) {
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
      deleteService(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getServiceList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    refresh() {
      this.getServiceList();
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.serviceList {
  margin: 25px;
}
</style>