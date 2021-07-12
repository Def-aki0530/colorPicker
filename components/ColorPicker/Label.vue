<template>
  <div class="label">
    <div>ベースカラー（入力）</div>
    <div>ベースカラー（出力）</div>
    <div>影色</div>
    <div>ハイライト</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
.label{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  div{
    font-size: 0.8rem;
    color: $mainColor;
  }
}

</style>