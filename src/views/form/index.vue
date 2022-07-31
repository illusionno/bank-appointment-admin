<template>
  <div class="home">
    <!-- 标题 -->
    <div class="header">
      <span class="line"></span>
      <span class="vertical-line"></span>
      <img src="../../assets/imgs/title.png" class="title" />
      <!-- <span class="title">车联网平台数据预览</span> -->
      <span class="vertical-line"></span>
      <span class="line"></span>
    </div>
    <!-- 主体 -->
    <div class="mian">
      <el-row>
        <!-- 第一列-->
        <el-col :span="6">
          <!-- 实时统计 -->
          <el-row>
            <div class="left1 i">
              <Card corner-top="295px"> 111 </Card>
            </div>
          </el-row>
          <!-- 行业分类 -->
          <el-row>
            <div class="left2 i">
              <Card corner-top="148px"> </Card>
            </div>
          </el-row>
          <!-- 车型分类 -->
          <el-row>
            <div class="left2 i">
              <Card corner-top="148px"> </Card>
            </div>
          </el-row>
        </el-col>
        <el-col :span="12">
          <!-- 车辆充电高峰时间 -->
          <el-row>
            <div class="middle i">
              <Card corner-top="148px"> </Card>
            </div>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row>
            <div class="right i">
              <Card> </Card>
            </div>
          </el-row>
          <!-- 报警车辆top5 -->
          <el-row>
            <div class="right i">
              <Card>
                <BarChart></BarChart>
              </Card>
            </div>
          </el-row>
          <el-row>
            <div class="right i">
              <Card> </Card>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 四个小拐角
import Card from '../../components/Card'
import BarChart from './module/BarChart.vue'
export default {
  components: {
    Card,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
// 卡片样式
@mixin cardStyle {
  background-color: rgba(8, 27, 91, 0.6);
  border-width: 1px;
  border-style: solid;
  border-color: rgb(32, 85, 139);
}
.home {
  width: 100%;
  height: 1200px;
  background: url(../../assets/imgs/map_bg.png) no-repeat center;
  background-attachment: fixed;
  background-size: cover;
  .header {
    height: 43px;
    text-align: center;
    line-height: 43px;
    padding: 12px;

    .title {
      height: 30px;
      vertical-align: -11px;
    }
    .line {
      display: inline-block;
      width: 30%;
      border-top: 3px solid #0089ff;
    }
    .vertical-line {
      display: inline-block;
      border-left: 4px solid #0089ff;
      height: 28px;
      vertical-align: -12px;
    }
  }
  .mian {
    margin: 20px 4px;
    .left1 {
      height: 365px;
      @include cardStyle;
    }
    .right {
      height: 256px;
      @include cardStyle;
    }
    .left2,
    .middle {
      height: 200px;
      @include cardStyle;
    }
    .i {
      margin: 8px;
    }

  }
}
</style>
