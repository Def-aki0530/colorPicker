<template>
  <div class="color-picker">
    <ColorPickerSelectImage />
    <ColorPickerSelectColor />
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
.color-picker {
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  background: $backgroundColor;
  @include mq(xl) {
    flex-direction: column;
  }
}
</style>