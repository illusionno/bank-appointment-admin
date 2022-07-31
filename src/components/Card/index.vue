<template>
  <div :cornerTop="cornerTop">
    <div class="corner">
      <img src="../../assets/imgs/bj-1.png" alt="" />
      <img src="../../assets/imgs/bj-2.png" alt="" />
    </div>
    <slot></slot>
    <div class="corner" :style="{ position: 'relative',top:cornerTop||'207px'}">
      <img src="../../assets/imgs/bj-4.png" alt="" />
      <img src="../../assets/imgs/bj-3.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    cornerTop: {
      type: String,
      default: '207px'
    }
  }
}
</script>

<style scoped lang="scss">
.corner {
  display: flex;
  justify-content: space-between;
  &:nth-child(2) {
    position: relative;
    top: 207px;
  }
}
</style>
