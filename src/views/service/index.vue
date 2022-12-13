<template>
  <div class="serviceList">
    <!-- 搜索与添加 -->
    <!-- <div class="search-row">
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
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "~@/styles/common.scss";
.serviceList {
  margin: 25px;
}
</style>