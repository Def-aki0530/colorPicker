<template>
  <div>
    <Header />
    <div class="guide">
      <div class="guide-container">
        <div class="guide-content">
          <div class="guide-label">説明</div>
          <p>AnimeColorDecision はアニメ塗りにおける色の決定を手助けするサイトです．</p>
          <p>特定のイラストレーターのイラストから色の情報を学習させ，色彩感性を模倣して色を決定します．</p>
        </div>
        <div class="guide-content">
          <div class="guide-label">注意</div>
          <p>以下の使い方はPCでのフルスクリーンを想定したものになります．</p>
          <p>スマホやタブレットから使用する場合は，数値を入力して使用してください．</p>
        </div>
        <div class="guide-content">
          <div class="guide-label">使い方</div>
          <div>絵が完成してから使用する場合</div>
          <div>絵を描いている途中で使用する場合</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.guide {
  width: 100%;
  min-height: calc(100vh - 60px);
  background: $backgroundColor;
}

.guide-container{
  width: 800px;
  color: $mainColor;
  margin: 0 auto;
  padding: 60px 0;
  @include mq(xl) {
    width: 100%;
    margin: 0;
    padding: 30px;
  }
}

.guide-content{
  margin: 0 0 30px;
}

.guide-label{
  font-size: 1.25rem;
  margin: 0 0 10px;
}
</style>