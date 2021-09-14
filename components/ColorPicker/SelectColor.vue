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
            :hexResultColor="i.hexBaseColor"
            :rgbResultColor="i.rgbBaseColor"
            :hsvResultColor="i.hsvBaseColor"
            :hslResultColor="i.hslBaseColor"
          />
          <ColorPickerResultColor
            :colorSpace="colorSpace"
            :label="'影色'" 
            :hexResultColor="i.hexShadowColor"
            :rgbResultColor="i.rgbShadowColor"
            :hsvResultColor="i.hsvShadowColor"
            :hslResultColor="i.hslShadowColor"
          />
          <ColorPickerResultColor
            :colorSpace="colorSpace"
            :label="'ハイライト'"
            :hexResultColor="i.hexHilightColor"
            :rgbResultColor="i.rgbHilightColor"
            :hsvResultColor="i.hsvHilightColor"
            :hslResultColor="i.hslHilightColor"
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
          hexBaseColor: "#ffffff",
          rgbBaseColor: [255, 255, 255],
          hsvBaseColor: [0, 0, 100],
          hslBaseColor: [0, 0, 100],
          hexShadowColor: "#ffffff",
          rgbShadowColor: [255, 255, 255],
          hsvShadowColor: [0, 0, 100],
          hslShadowColor: [0, 0, 100],
          hexHilightColor: "#ffffff",
          rgbHilightColor: [255, 255, 255],
          hsvHilightColor: [0, 0, 100],
          hslHilightColor: [0, 0, 100],
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
        hexBaseColor: "#ffffff",
        rgbBaseColor: [255, 255, 255],
        hsvBaseColor: [0, 0, 100],
        hslBaseColor: [0, 0, 100],
        hexShadowColor: "#ffffff",
        rgbShadowColor: [255, 255, 255],
        hsvShadowColor: [0, 0, 100],
        hslShadowColor: [0, 0, 100],
        hexHilightColor: "#ffffff",
        rgbHilightColor: [255, 255, 255],
        hsvHilightColor: [0, 0, 100],
        hslHilightColor: [0, 0, 100],
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
        const baseR = parseInt((Number(res.data[this.colorValue[i].inputNearColor[0]][0]) + rgbInputColor[0]) / 2);
        const baseG = parseInt((Number(res.data[this.colorValue[i].inputNearColor[0]][1]) + rgbInputColor[1]) / 2);
        const baseB = parseInt((Number(res.data[this.colorValue[i].inputNearColor[0]][2]) + rgbInputColor[2]) / 2);

        this.colorValue[i].rgbBaseColor = [baseR, baseG, baseB];
        this.colorValue[i].hexBaseColor = this.rgb2hex(this.colorValue[i].rgbBaseColor);
        this.colorValue[i].hsvBaseColor = this.rgb2hsv(this.colorValue[i].rgbBaseColor);
        this.colorValue[i].hslBaseColor = this.rgb2hsl(this.colorValue[i].rgbBaseColor);
      }

      //baseColorに近い色を5個取得
      
      
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
      const rgb = [r,g,b]

      return rgb
    
    },
    rgb2hex(input) {
      const rHex = ("0" + Number(input[0]).toString(16)).slice(-2);
      const gHex = ("0" + Number(input[1]).toString(16)).slice(-2);
      const bHex = ("0" + Number(input[2]).toString(16)).slice(-2);
      const hex = "#" + rHex + gHex + bHex;
      
      return hex
    
    },
    rgb2hsv(input) {
      let r = Number(input[0]) / 255;
      let g = Number(input[1]) / 255;
      let b = Number(input[2]) / 255;

      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let diff = max - min;

      let h = 0;

      switch (min) {
        case max:
          h = 0;
          break;

        case r:
          h = 60 * ((b - g) / diff) + 180;
          break;

        case g:
          h = 60 * ((r - b) / diff) + 300;
          break;

        case b:
          h = 60 * ((g - r) / diff) + 60;
          break;
      }

      let s = max == 0 ? 0 : diff / max;
      let v = max;

      const hv = Math.round(h);
      const sv = Math.round(s * 100);
      const vv = Math.round(v * 100);
      const hsv = [hv, sv, vv];

      return hsv

    },
    rgb2hsl(input) {
      let r = Number(input[0]);
      let g = Number(input[1]);
      let b = Number(input[2]);

      const RGB_MAX = 255;
      const HUE_MAX = 360;
      const SATURATION_MAX = 100;
      const LIGHTNESS_MAX = 100;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l;

      // Hue
      const hp = HUE_MAX / 6;
      if (max == min) {
        h = 0;
      } else if (r == max) {
        h = hp * ((g - b) / (max - min));
      } else if (g == max) {
        h = hp * ((b - r) / (max - min)) + HUE_MAX / 3;
      } else {
        h = hp * ((r - g) / (max - min)) + (HUE_MAX * 2) / 3;
      }
      if (h < 0) {
        h += HUE_MAX;
      }

      // Saturation
      const cnt = (max + min) / 2;
      if (cnt < RGB_MAX / 2) {
        if (max + min <= 0) {
          s = 0;
        } else {
          s = ((max - min) / (max + min)) * SATURATION_MAX;
        }
      } else {
        s = ((max - min) / (RGB_MAX * 2 - max - min)) * SATURATION_MAX;
      }

      // Lightness
      l = ((max + min) / RGB_MAX / 2) * LIGHTNESS_MAX;

      if (isNaN(s)) {
        s = 0;
      }

      const hl = Math.round(h);
      const sl = Math.round(s);
      const ll = Math.round(l);
      const hsl = [hl, sl, ll];

      return hsl

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