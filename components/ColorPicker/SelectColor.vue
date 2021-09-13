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
        <ColorPickerButton :text="'生成'" @buttonEvent="createColor()" />
        <ColorPickerButton :text="'リセット'" @buttonEvent="resetColor()" />
      </div>
    </div>

    <div class="input-color-container">
      <ColorPickerArea v-for="(i, index) in colorValue" :key="i.id">
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
          <ColorPickerResultColor
            :colorSpace="colorSpace"
            :label="'影色'" 
          />
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
import Papa from 'papaparse'

export default {
  data() {
    return {

      colorValueId: 0,
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
          id: 0,
          inputColor: "#ffffff",
          baseColor: [255, 255, 255],
          shadowColor: [255, 255, 255],
          hilightColor: [255, 255, 255],
          nearColor:[
            [0, 255],
            [0, 255],
            [0, 255],
            [0, 255],
            [0, 255],
            [0, 255],
          ],
          inputNearColor: [0, 255],
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
      this.colorValue.splice(index, 1);
    },
    addValue() {
      this.colorValue.push({
        id: ++this.colorValueId,
        inputColor: "#ffffff",
        baseColor: [255, 255, 255],
        shadowColor: [255, 255, 255],
        hilightColor: [255, 255, 255],
        nearColor:[
          [0, 255],
          [0, 255],
          [0, 255],
          [0, 255],
          [0, 255],
          [0, 255],
        ],
        inputNearColor: [0, 255],
      });
    },
    async createColor(){
      //colorPatternのCSVファイルの読み込み
      const fileName = "color" + this.colorPattern + ".csv";
      const res = await fetch("./data/" + fileName).then(data => data.text()).then(v => Papa.parse(v));
      //inputColorに最も近い色の取得
      let rgbInputColor = []; 
      for(let i = 0; i < this.colorValue.length; i++){
        rgbInputColor = this.hex2rgb(this.colorValue[i].inputColor);
        let csvBaseColor = [];
        let len;
        for(let j = 1; j < res.data.length; j++){
          csvBaseColor = [res.data[j][0], res.data[j][1], res.data[j][2]];
          len = this.calcLen(rgbInputColor, csvBaseColor);
          if(len < this.colorValue[i].inputNearColor[1]){
            this.colorValue[i].inputNearColor[0] = j;
            this.colorValue[i].inputNearColor[1] = len;
          }
        }
        //baseColorの生成
        const baseR = (res.data[this.colorValue[i].inputNearColor[0]][0] + rgbInputColor[0]) / 2;
        const baseG = (res.data[this.colorValue[i].inputNearColor[0]][1] + rgbInputColor[1]) / 2;
        const baseB = (res.data[this.colorValue[i].inputNearColor[0]][2] + rgbInputColor[2]) / 2;

        this.colorValue[i].baseColor = [baseR, baseG, baseB];
      }
      console.log(this.colorValue)
      
    },
    resetColor(){
      console.log("move reset");
    },
    searchInputNearColor(){

    },
    sortColor(a){
      for(let i = 0; i < res.data.length; i++){
        let len = calcLen(a, res.data[i])
        if(len < nearColor[5][1]){
          nearColor[5][0] = i
          nearColor[5][1] = len

          // バブルソート
          for(let k = 0; k < nearColor.length; k++){
            for(let l = nearColor.length-1; l > k ; l-- ){
              if(nearColor[l][1] < nearColor[l-1][1]){
                let tmp1 = nearColor[l][0];
                let tmp2 = nearColor[l][1];
                nearColor[l][0] = nearColor[l-1][0];
                nearColor[l][1] = nearColor[l-1][1];
                nearColor[l-1][0] =tmp1;
                nearColor[l-1][1] =tmp2;
              }
            }
          }
        }
      }
    },
    calcLen(a, b){
      return Math.sqrt(Math.pow( a[0]-b[0], 2 ) + Math.pow( a[1]-b[1], 2 ) + Math.pow( a[2]-b[2], 2 ))
    },
    hex2rgb(input) {
      const hex = input.split("");
      const r = parseInt(hex[1].toString() + hex[2].toString(), 16);
      const g = parseInt(hex[3].toString() + hex[4].toString(), 16);
      const b = parseInt(hex[5].toString() + hex[6].toString(), 16);
      let rgb = [r,g,b]

      return rgb
    }
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