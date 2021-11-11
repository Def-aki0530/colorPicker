<template>
  <div class="area">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.area {
  width: 100%;
  display: flex;
  margin: 10px 0;
  @include mq(md) {
    flex-direction: column;
  }
}
</style>