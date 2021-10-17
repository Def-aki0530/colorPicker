<template>
  <div class="result-color">
    <div class="result-color-label">{{ label }}</div>
    <div class="result-color-contents">
      <label
        class="color-preview"
        :style="{ background: hexResultColor }"
      ></label>
      <div class="result-value-area" v-if="colorSpace === '1'">
        <div class="result-value">
          <p>R</p>
          <div>{{ rgbResultColor[0] }}</div>
        </div>
        <div class="result-value">
          <p>G</p>
          <div>{{ rgbResultColor[1] }}</div>
        </div>
        <div class="result-value">
          <p>B</p>
          <div>{{ rgbResultColor[2] }}</div>
        </div>
      </div>
      <div class="result-value-area" v-if="colorSpace === '2'">
        <div class="result-value">
          <p>H</p>
          <div>{{ hsvResultColor[0] }}</div>
        </div>
        <div class="result-value">
          <p>S</p>
          <div>{{ hsvResultColor[1] }}</div>
        </div>
        <div class="result-value">
          <p>V</p>
          <div>{{ hsvResultColor[2] }}</div>
        </div>
      </div>
      <div class="result-value-area" v-if="colorSpace === '3'">
        <div class="result-value">
          <p>H</p>
          <div>{{ hslResultColor[0] }}</div>
        </div>
        <div class="result-value">
          <p>S</p>
          <div>{{ hslResultColor[1] }}</div>
        </div>
        <div class="result-value">
          <p>L</p>
          <div>{{ hslResultColor[2] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    colorSpace: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    hexResultColor: {
      type: String,
      default: "",
    },
    rgbResultColor: {
      type: Array,
      default: () => [],
    },
    hsvResultColor: {
      type: Array,
      default: () => [],
    },
    hslResultColor: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.result-color {
  width: 32%;
  height: auto;
}

.result-color-label {
  width: 100%;
  font-size: 0.8rem;
  color: $mainColor;
  text-align: center;
  margin-bottom: 10px;
}

.result-color-contents {
  width: 100%;
  display: flex;
  align-items: space-between;
  position: relative;
}

.color-preview {
  width: 46%;
  position: relative;
  border-radius: 5px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.result-value-area {
  width: 54%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-value {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  p {
    width: 22%;
    font-size: 0.8rem;
    color: $mainColor;
    text-align: center;
  }
  div {
    width: 78%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    font-size: 0.8rem;
    color: $mainColor;
    border-radius: 5px;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
  }
}
</style>