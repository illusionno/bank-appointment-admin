<template>
  <div class="userList">
    <!-- 搜索与添加 -->
    <div class="search-row">
      <el-form :inline="true" :model="queryInfo">
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
            v-model="queryInfo.certificatesType"
            placeholder="请选择"
            style="width: 150px"
          >
            <el-option label="锁定" value="0"></el-option>
            <el-option label="正常" value="1"></el-option>
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
    <el-table :data="userdata" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="passWord" label="密码"></el-table-column>
      <el-table-column
        prop="certificatesType"
        label="证件类型"
      ></el-table-column>
      <el-table-column prop="certificatesNo" label="证件号码"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>

      <!-- <el-table-column label="状态" >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="删除时间"></el-table-column>
      <el-table-column label="操作">
        <template>
          <!-- 修改按钮 -->
          <el-button
            plain
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdateUser"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUserById"
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
      :total="this.userdata.length"
    >
    </el-pagination>

    <!-- 添加用户对话框 -->
    <AddUser ref="addUser"></AddUser>
    <!-- 编辑用户对话框 -->
    <UpdateUser ref="updateUser"></UpdateUser>
  </div>
</template>

<script>
import { getUser } from "@/api/userManage.js";
import AddUser from "./module/AddUser";
import UpdateUser from "./module/UpdateUser.vue";
// const data = [
//   {
//     id: 1,
//     name: "admin",
//     phone: "1111",
//     passWord: "123456",
//     certificatesType: "111",
//     certificatesNo: "11111",
//     status: 1,
//     createTime: "2022-11-22T13:24:30.000+0000",
//     updateTime: "2022-11-22T13:24:51.000+0000",
//     isDeleted: 0
//   },
//   {
//     id: 2,
//     name: "heeh",
//     phone: "1311",
//     passWord: "123456",
//     certificatesType: "111",
//     certificatesNo: "11111",
//     status: 1,
//     createTime: "2022-11-22T13:24:30.000+0000",
//     updateTime: "2022-11-22T13:24:51.000+0000",
//     isDeleted: 0
//   }
// ];
export default {
  components: {
    AddUser,
    UpdateUser
  },
  data() {
    return {
      // data,
      userdata: [],
      // 列表参数
      // 当前页数
      page: 1,
      // 当前每页显示多少数据
      limit: 5,
      queryInfo: {
        name: "",
        status: ""
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 请求用户列表
    getUserList() {
      getUser(this.page, this.limit, this.queryInfo)
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.userdata = res.data.data.records;
            this.userdata.forEach(item => {
              item.createTime = this.$moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.updateTime = this.$moment(item.updateTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });
            console.log(this.userdata);
          } else {
            this.$message.error("请求失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 通过用户名搜索
    handleSearch() {},
    // 监听pagesize事件
    handleSizeChange(val) {
      this.page = val;
      this.getUserList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.limit = val;
      this.getUserList();
    },
    // 显示添加用户对话框
    showAddUser() {
      this.$refs.addUser.visible = true;
    },
    // 显示编辑用户对话框
    showUpdateUser() {
      this.$refs.updateUser.visible = true;
    },
    // 通过id删除用户
    async deleteUserById() {
      //
      // const confirmResult = await this.$confirm("确定要删除该用户吗?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).catch(err => err);
      // // 用户确认删除, 返回字符串confirm
      // // 用户取消删除, 返回字符串cancel
      // if (confirmResult != "confirm") {
      //   return this.$message.info("已取消删除");
      // }
      /*   const { data: res } = await this.$http.delate("users/" + id);
      if (res.meta.status != 200) {
        return this.$message.error("删除该用户失败");
      } */
      // this.$message.success("删除用户成功");
      // this.getUserList()
    }
  }
};
</script>

<style scoped lang="scss">
.userList {
  margin: 25px;
  // /deep/el-button {
  //   &:focus {
  //     background: purple;
  //   }
  // }
  .search-row {
    display: flex;
    align-items: center;
    // margin-bottom: 15px;
    /deep/input:focus {
      border: 1px solid #725fa6;
    }
    .my-btn {
      color: #725fa6;
      border: 1px solid #725fa6;
      background-color: #e8e3f4;
      &:hover {
        background-color: #917ccb;
        color: #fff;
      }
    }
  }
  .my-pagination {
    float: right;
    margin-top: 20px;
  }
}
</style>
