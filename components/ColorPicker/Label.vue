<template>
  <div class="label">
    <p>ベースカラー（入力）</p>
    <div></div>
    <p>ベースカラー（出力）</p>
    <p>影色</p>
    <p>ハイライト</p>
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
  margin: 15px 0;
  p{
    width: 216px;
    display: flex;
    justify-content: center;
    font-size: 0.8rem;
    color: $mainColor;
  }
  div{
    width: 100px;
  }
}

</style>