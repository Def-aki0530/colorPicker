<template>
  <div class="select-color">
    <div class="operation">
      <ColorPickerSelect
        :id="'color-pattern'"
        :value="defaultPatternNumber"
        :options="patternOptions"
        :width="'160px'"
        @selected="selected"
      />
      <ColorPickerSelect
        :id="'color-space'"
        :value="defaultSpaceNumber"
        :options="spaceOptions"
        :width="'120px'"
        @selected="selected"
      />
      <div class="button-area">
        <ColorPickerButton :text="'生成'" />
        <ColorPickerButton :text="'リセット'" />
      </div>
    </div>

    <div class="input-color-container">
      <ColorPickerArea v-for="(i, index) in colorValue" :key="index">
        <div class="input-color-area">
          <ColorPickerInputColor
            :id="index"
            :colorSpace="colorSpace"
            :label="'基本色(入力)'"
            :inputColor="i.inputColor"
            @returnColor="i.inputColor = $event"
          />
          <ColorPickerArrow @deleteValue="deleteValue(index)" />
        </div>
        <div class="result-color-area">
          <ColorPickerResultColor
            :colorSpace="colorSpace"
            :label="'基本色(出力)'"
          />
          <ColorPickerResultColor :colorSpace="colorSpace" :label="'影色'" />
          <ColorPickerResultColor
            :colorSpace="colorSpace"
            :label="'ハイライト'"
          />
        </div>
      </ColorPickerArea>

      <ColorPickerPlusButton @addValue="addValue()" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorPattern: "1",
      colorSpace: "1",

      defaultPatternNumber: "1",
      patternOptions: [
        { code: "1", name: "カラーパターン1" },
        { code: "2", name: "カラーパターン2" },
        { code: "3", name: "カラーパターン3" },
      ],

      defaultSpaceNumber: "1",
      spaceOptions: [
        { code: "1", name: "RGB" },
        { code: "2", name: "HSV" },
        { code: "3", name: "HSL" },
      ],

      colorValue: [
        {
          inputColor: "#ffffff",
          baseColor: "#ffffff",
          shadowColor: "#ffffff",
          hilightColor: "#ffffff",
        },
      ],
    };
  },
  methods: {
    selected(value, id) {
      if (id === "color-pattern") {
        this.colorPattern = value;
      } else if (id === "color-space") {
        this.colorSpace = value;
      }
    },
    deleteValue(index) {
      console.log(index);
      this.colorValue.splice(index, 1);
      console.log(this.colorValue);
    },
    addValue() {
      this.colorValue.push({
        inputColor: "#ffffff",
        baseColor: "#ffffff",
        shadowColor: "#ffffff",
        hilightColor: "#ffffff",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.select-color {
  width: 65%;
  padding: 60px 60px 60px 0;
  @include mq(xl) {
    width: 100%;
    padding: 0 30px 30px 30px;
  }
}

.input-color-container {
  width: 100%;
  height: calc(100vh - 240px);
  overflow-y: scroll;
}

.operation {
  width: 100%;
  display: flex;
  @include mq(md) {
    flex-direction: column;
  }
}

.button-area {
  display: flex;
}

.input-color-area {
  width: 35%;
  display: flex;
  @include mq(md) {
    width: 100%;
  }
}

.result-color-area {
  width: 65%;
  display: flex;
  justify-content: space-between;
  @include mq(md) {
    width: 100%;
  }
}
</style>