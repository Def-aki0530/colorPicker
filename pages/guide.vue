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
          <p>1. 画像を選択ボタンからシステムで使用したいイラストを読み込んで表示することが出来ます．</p>
          <img src="@/assets/img/guide1.png" alt="guide1">
          <p>2. カラーパターンのセレクトボックスから色の生成パターンを選択できます(現状一種類のみ)．</p>
          <p>3. 未設定時RGBのセレクトボックスから色の表示形式を変更できます．</p>
          <p>4. スポイトアイコンからブラウザのカラーピッカーツールを開くことが出来ます．ブラウザのカラーピッカーツールのスポイト機能を使用して色を選択するか，数値を入力欄に入力して基本色(入力)を設定します．</p>
          <img src="@/assets/img/guide2.png" alt="guide2">
          <p>5. + ボタンで一度に実行する色の入力色の数を増やすことが出来ます．× ボタンで削除も可能です．</p>
          <p>6. 実行ボタンを押すとベースカラーや影色，ハイライトが出力されます．</p>
          <img src="@/assets/img/guide3.png" alt="guide3">
          <p>7. 生成された色を使ってイラストを塗ってみましょう！ (↓使用例 )</p>
          <img src="@/assets/img/guide4.png" alt="guide4">
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

.guide-container {
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

.guide-content {
  margin: 0 0 30px;
  p {
    margin: 0 0 5px;
  }
  img {
    width: 100%;
    height: auto;
    margin: 0 0 10px;
  }
}

.guide-label {
  font-size: 1.25rem;
  margin: 0 0 10px;
}
</style>