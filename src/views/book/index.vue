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
    <el-table :data="data" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="bankName" label="银行名称"></el-table-column>
      <el-table-column prop="businessBank" label="业务名称"></el-table-column>
      <!-- <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#917ccb"
          ></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="userName" label="预约人"></el-table-column>
      <el-table-column
        prop="appointmentTime"
        label="预约时间"
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
      :total="10"
    >
    </el-pagination>
    <AddBook ref="addBook"></AddBook>
  </div>
</template>

<script>
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
  methods: {
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
  },
};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.bookList {
  margin: 25px;
}
</style>