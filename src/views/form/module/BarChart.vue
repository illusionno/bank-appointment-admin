<template>
  <div id="bar">
    <div class="bar-title">报警车辆top5</div>
    <div id="bar"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
const option = {
  // title: {
  //   text: '报警车辆top5',
  // },
  color: ['#2f89cf'], // 柱状图颜色
  tooltip: {
    // 触发类型
    trigger: 'axis', // 可选'item' 一般用于散点图，饼图等
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  // 图表大小
  grid: {
    left: '13',
    right: '13',
    top: '30',
    bottom: '20',
    containLabel: true // grid 区域是否包含坐标轴的刻度标签。
  },
  xAxis: [
    {
      type: 'category', // 'category' 类目轴, 'value' 数值轴
      // x轴中data数据
      data: ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5'],
      // 刻度标签
      axisLabel: {
        inside: false,
        textStyle: {
          color: '#bac0c0',
          fontWeight: 'normal',
          fontSize: '12'
        }
      },
      // x坐标轴的样式
      axisLine: {
        show: true,
        lineStyle: {
          color: '#363e83'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#bac0c0',
          fontWeight: 'normal',
          fontSize: '12'
        },
        formatter: '{value}'
      },
      // y轴分隔线
      splitLine: {
        show: true,
        lineStyle: {
          color: '#32346c '
        }
      },

      axisLine: {
        show: true,
        lineStyle: {
          color: '#32346c'
        }
      }
    }
  ],

  series: [
    {
      name: '报警车辆top5',
      type: 'bar',
      // 柱子的宽度
      // itemStyle: {
      //   // 修改柱子圆角
      //   barBorderRadius: 8
      // },
      // 开发中,从ajax请求数据
      data: [200, 300, 300, 900, 1500],
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#00c0e9'
            },
            {
              offset: 1,
              color: '#3b73cf'
            }
          ]),
          barBorderRadius: 50,
          borderWidth: 0
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: 'rgba(105,123, 214, 0.7)'
        }
      },
      zlevel: 2,
      barWidth: '20%'
    }
  ]
}
export default {
  name: 'BarChart',
  data() {
    return {
      option
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化图表
    initData() {
      const myChart = this.$echarts.init(document.getElementById('bar'))
      // 设置配置项
      myChart.setOption(option)
      // 图表自适应
      this.$resize(myChart)
    }
  }
}
</script>

<style scoped lang="scss">
#bar {
  width: 100%;
  height: 220px;
  .bar-title {
    color: rgb(255, 255, 255);
    font-weight: 600;
    font-size: 16px;
    margin-left: 15px;
  }
}
</style>
