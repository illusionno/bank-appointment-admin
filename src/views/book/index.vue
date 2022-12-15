<template>
  <div class="bookList">
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
        <el-form-item label="预约人:">
          <el-input
            placeholder="请输入预约人"
            clearable
            v-model.trim="queryInfo.userName"
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
          @click="showAddBook"
          icon="el-icon-plus"
          >添加预约</el-button
        >
      </el-form>
    </div>

    <!-- 银行列表 -->
    <el-table :data="bookData" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="businessName" label="业务名称"></el-table-column>
      <el-table-column prop="userName" label="预约人"></el-table-column>
      <el-table-column prop="appointmentTime" label="预约时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.appointmentTime }}</span>
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
            @click="showUpdateBook"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteBookById(scope.row.id)"
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
      :total="this.bookData.length"
    >
    </el-pagination>
    <AddBook ref="addBook"></AddBook>
  </div>
</template>

<script>
import { getBook, deleteBook } from "@/api/book.js";
import AddBook from "./module/AddBook.vue";

const data = [
  {
    id: 1,
    bankName: "中国银行",
    businessBank: "取钱",
    userName: "小李",
    appointmentTime: "2022-11-22T13:24:30.000+0000",
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
  },
  {
    id: 2,
    bankName: "中国建设",
    businessBank: "取钱1",
    status: true,
    userName: "小李1",
    appointmentTime: "2022-11-22T13:24:30.000+0000",
    createTime: "2022-11-22T13:24:30.000+0000",
    updateTime: "2022-11-22T13:24:51.000+0000",
  },
];
export default {
  components: {
    AddBook,
  },
  data() {
    return {
      data,
      bookData: [],
      // 当前页数
      page: 1,
      // 当前每页显示多少数据
      limit: 5,
      // 查询参数
      queryInfo: {
        bankName: "",
        userName: "",
        businessName: "",
      },
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    getBookList() {
      getBook(this.page, this.limit)
        .then((res) => {
          if (res.data.code === 200) {
            this.bookData = res.data.data.records;
            this.bookData.forEach((item) => {
              item.appointmentTime = this.$moment(item.appointmentTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.createTime = this.$moment(item.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              item.updateTime = this.$moment(item.updateTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              // 0可预约 1不可预约
              // item.status = item.status == 0 ? true : false;
            });
          } else {
            this.$message.error("请求失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSearch() {},
    // 监听pagesize事件
    handleSizeChange(val) {
      this.page = val;
      // this.getBankList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.limit = val;
      // this.getBankList();
    },
    showAddBook() {
      this.$refs.addBook.visible = true;
    },
    showUpdateBook() {
      // this.$refs.updateBook.visible = true;
    },
    //删除预约
    async deleteBookById(id) {
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
      deleteBook(id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("删除成功");
          this.getBookList();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.bookList {
  margin: 25px;
}
</style>