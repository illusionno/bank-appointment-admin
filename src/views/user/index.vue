<template>
  <div class="userList">
    <!-- 搜索与添加 -->
    <div class="search-row">
      <el-form :inline="true" v-model="queryInfo">
        <el-form-item label="用户名:">
          <el-input
            placeholder="请输入用户名"
            clearable
            v-model.trim="queryInfo.name"
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
            <el-option label="锁定" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
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
          @click="showAddUser"
          icon="el-icon-plus"
          >添加用户</el-button
        >
      </el-form>
    </div>
    <!-- 用户列表 -->
    <el-table :data="userData" border stripe v-loading="loading">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="passWord" label="密码"></el-table-column>
      <el-table-column prop="certificatesType" label="证件类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.certificatesType == 1">身份证</el-tag>
          <el-tag type="success" v-else>其他证件</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="certificatesNo" label="证件号码">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#917ccb"
            @change="userStatuschange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间">
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
            @click="showUpdateUser(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUserById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="my-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[ 3, 5, 7]"
      :page-size="100"
      :current-page.sync="page"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户对话框 -->
    <AddUser ref="addUser" @refresh="refresh"></AddUser>
    <!-- 编辑用户对话框 -->
    <UpdateUser ref="updateUser" @refresh="refresh"></UpdateUser>
  </div>
</template>

<script>
import { getUser, deleteUser, updateUser } from "@/api/userManage.js";
import AddUser from "./module/AddUser";
import UpdateUser from "./module/UpdateUser.vue";
const data = [
  {
    id: 1,
    name: "admin",
    phone: "1111",
    passWord: "123456",
    certificatesType: "111",
    certificatesNo: "11111",
    status: true,
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
  {
    id: 2,
    name: "heeh",
    phone: "1311",
    passWord: "123456",
    certificatesType: "111",
    certificatesNo: "11111",
    status: false,
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
    isDeleted: 0,
  },
];
export default {
  components: {
    AddUser,
    UpdateUser,
  },
  data() {
    return {
      data,
      loading: false,
      // 用户列表
      userData: [],
      // 当前页数
      page: 1,
      // 当前每页显示多少数据
      limit: 3,
      total:0,
      // 查询参数
      queryInfo: {
        name: "",
        status: "",
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 请求用户列表
    getUserList() {
      this.loading = true;
      getUser(this.page, this.limit, this.queryInfo)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.userData = res.data.data.records;
            this.total = res.data.data.total
            this.userData.forEach((item) => {
              item.createTime = this.$moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.updateTime = this.$moment(item.updateTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              // 0锁定 1正常
              item.status = item.status == 0 ? false : true;
              // item.certificatesType = item.certificatesType == '1'?'身份证':'其他证件'
            });
            this.loading = false;
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
      this.getUserList();
    },
    // 监听pagesize事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getUserList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page= val;
      this.getUserList();
    },
    // 显示添加用户对话框
    showAddUser() {
      this.$refs.addUser.visible = true;
    },
    // 显示编辑用户对话框
    showUpdateUser(record) {
      this.$refs.updateUser.visible = true;
      this.$refs.updateUser.edit(record);
    },
    // 用户状态改变
    userStatuschange(val) {
      val.status = val.status == true ? 1 : 0;
      delete val.updateTime;
      delete val.createTime;
      console.log("change", val);
      updateUser(val)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            this.$message.success("更新成功");
            this.getUserList();
          } else {
            this.$message.error("更新失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过id删除用户
    async deleteUserById(id) {
      console.log(id);
      const confirmResult = await this.$confirm("确定要删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      // 用户确认删除, 返回字符串confirm
      // 用户取消删除, 返回字符串cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      }
      deleteUser(id).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getUserList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    refresh() {
      this.getUserList();
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.userList {
  margin: 25px;
}
</style>
