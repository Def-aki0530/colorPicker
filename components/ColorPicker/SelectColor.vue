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
            :hexResultColor="i.hexHighlightColor"
            :rgbResultColor="i.rgbHighlightColor"
            :hsvResultColor="i.hsvHighlightColor"
            :hslResultColor="i.hslHighlightColor"
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
          hexHighlightColor: "#ffffff",
          rgbHighlightColor: [255, 255, 255],
          hsvHighlightColor: [0, 0, 100],
          hslHighlightColor: [0, 0, 100]
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
        hexHighlightColor: "#ffffff",
        rgbHighlightColor: [255, 255, 255],
        hsvHighlightColor: [0, 0, 100],
        hslHighlightColor: [0, 0, 100],
      });
    },
    async createColor(){
      // colorPatternのCSVファイルの読み込み
      const colorFileName = "color" + this.colorPattern + ".csv";
      const color = await fetch("./data/" + colorFileName).then(data => data.text()).then(v => Papa.parse(v));

      const highlightFileName = "highlight" + this.colorPattern + ".csv";
      const highlight = await fetch("./data/" + highlightFileName).then(data => data.text()).then(v => Papa.parse(v));

      let rgbInputColor = [];
      let hsvInputColor = []; 
      let csvBaseColor = [];

      let len;
      let i, j, k, l;
      let tmp1, tmp2;

      let baseH, baseS, baseV;

      let shadowH;
      let shadowS = [];
      let shadowV = [];

      let highlightH;
      let highlightS = [];
      let highlightV = [];

      let inputNearColor = [0, 360];
      let nearColor = [
        [0, 360],
        [0, 360],
        [0, 360],
        [0, 360],
        [0, 360],
        [0, 360]
      ];

      for(i = 0; i < this.colorValue.length; i++){
        // 基本色
        // inputNearColorの初期化
        inputNearColor = [0, 360];
        // inputColorに最も近い色の取得
        rgbInputColor = this.hex2rgb(this.colorValue[i].inputColor);
        hsvInputColor = this.rgb2hsv(rgbInputColor);
        for(j = 1; j < color.data.length; j++){
          csvBaseColor = [color.data[j][0], color.data[j][1], color.data[j][2]];
          len = this.calcLen3d(hsvInputColor, csvBaseColor);
          if(len < inputNearColor[1]){
            inputNearColor[0] = j;
            inputNearColor[1] = len;
          }
        }

        // baseColorの決定
        baseH = parseInt((Number(color.data[inputNearColor[0]][0]) + hsvInputColor[0]) / 2);
        baseS = parseInt((Number(color.data[inputNearColor[0]][1]) + hsvInputColor[1]) / 2);
        baseV = parseInt((Number(color.data[inputNearColor[0]][2]) + hsvInputColor[2]) / 2);

        this.colorValue[i].hsvBaseColor = [baseH, baseS, baseV];
        this.colorValue[i].rgbBaseColor = this.hsv2rgb(this.colorValue[i].hsvBaseColor);
        this.colorValue[i].hexBaseColor = this.rgb2hex(this.colorValue[i].rgbBaseColor);
        this.colorValue[i].hslBaseColor = this.rgb2hsl(this.colorValue[i].rgbBaseColor);

        // 影色
        // nearColorの初期化
        nearColor = [
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360]
        ];

        // baseColorに近い色を5個取得
        for(j = 1; j < color.data.length; j++){
          csvBaseColor = [color.data[j][0], color.data[j][1], color.data[j][2]];
          len = this.calcLen3d(this.colorValue[i].hsvBaseColor, csvBaseColor);
          if(len < nearColor[5][1]){
            nearColor[5][0] = j;
            nearColor[5][1] = len;

            // バブルソート
            for(k = 0; k < nearColor.length; k++){
              for(l = nearColor.length-1; l > k ; l--){
                if(nearColor[l][1] < nearColor[l-1][1]){
                  tmp1 = nearColor[l][0];
                  tmp2 = nearColor[l][1];
                  nearColor[l][0] = nearColor[l-1][0];
                  nearColor[l][1] = nearColor[l-1][1];
                  nearColor[l-1][0] =tmp1;
                  nearColor[l-1][1] =tmp2;
                }
              }
            }
          }
        }

        // 影色Hの決定
        let shadowHData = [
          color.data[nearColor[0][0]][3],
          color.data[nearColor[1][0]][3],
          color.data[nearColor[2][0]][3],
          color.data[nearColor[3][0]][3],
          color.data[nearColor[4][0]][3],
        ];

        this.clustering(shadowHData);
        
        shadowH = Math.round((Number(color.data[nearColor[0][0]][3]) + Number(color.data[nearColor[0][0]][3]) + Number(color.data[nearColor[0][0]][3]) + this.colorValue[i].hsvBaseColor[0]) / 4);
        this.colorValue[i].hsvShadowColor[0] = shadowH;

        // 影色Sの決定
        shadowS = [
          [color.data[nearColor[0][0]][0], color.data[nearColor[0][0]][1], color.data[nearColor[0][0]][2], color.data[nearColor[0][0]][4]],
          [color.data[nearColor[1][0]][0], color.data[nearColor[1][0]][1], color.data[nearColor[1][0]][2], color.data[nearColor[1][0]][4]],
          [color.data[nearColor[2][0]][0], color.data[nearColor[2][0]][1], color.data[nearColor[2][0]][2], color.data[nearColor[2][0]][4]],
          [color.data[nearColor[3][0]][0], color.data[nearColor[3][0]][1], color.data[nearColor[3][0]][2], color.data[nearColor[3][0]][4]],
          [color.data[nearColor[4][0]][0], color.data[nearColor[4][0]][1], color.data[nearColor[4][0]][2], color.data[nearColor[4][0]][4]]
        ];

        const ssMaterial = this.multipleRegressionAnalysis(shadowS);
        this.colorValue[i].hsvShadowColor[1] = parseInt((ssMaterial[0]*baseH) + (ssMaterial[1]*baseS) + (ssMaterial[2]*baseV) + ssMaterial[3]);
        if((this.colorValue[i].hsvShadowColor[1] < 0)||(this.colorValue[i].hsvShadowColor[1] > 100)||(isFinite(this.colorValue[i].hsvShadowColor[1]) === false)){
          this.colorValue[i].hsvShadowColor[1] = Math.round((Number(color.data[nearColor[0][0]][4]) + Number(color.data[nearColor[0][0]][4]) + Number(color.data[nearColor[0][0]][4]) + Number(color.data[nearColor[1][0]][4]) + Number(color.data[nearColor[2][0]][4])) / 5);
          console.log("no data shadowS " + i);
        }

        // 影色Vの決定
        shadowV = [
          [color.data[nearColor[0][0]][0], color.data[nearColor[0][0]][1], color.data[nearColor[0][0]][2], color.data[nearColor[0][0]][5]],
          [color.data[nearColor[1][0]][0], color.data[nearColor[1][0]][1], color.data[nearColor[1][0]][2], color.data[nearColor[1][0]][5]],
          [color.data[nearColor[2][0]][0], color.data[nearColor[2][0]][1], color.data[nearColor[2][0]][2], color.data[nearColor[2][0]][5]],
          [color.data[nearColor[3][0]][0], color.data[nearColor[3][0]][1], color.data[nearColor[3][0]][2], color.data[nearColor[3][0]][5]],
          [color.data[nearColor[4][0]][0], color.data[nearColor[4][0]][1], color.data[nearColor[4][0]][2], color.data[nearColor[4][0]][5]]
        ];

        const svMaterial = this.multipleRegressionAnalysis(shadowV);
        this.colorValue[i].hsvShadowColor[2] = parseInt((svMaterial[0]*baseH) + (svMaterial[1]*baseS) + (svMaterial[2]*baseV) + svMaterial[3]);
        if((this.colorValue[i].hsvShadowColor[2] < 0)||(this.colorValue[i].hsvShadowColor[2] > 100)||(isFinite(this.colorValue[i].hsvShadowColor[2]) === false)){
          this.colorValue[i].hsvShadowColor[2] = Math.round((Number(color.data[nearColor[0][0]][5]) + Number(color.data[nearColor[0][0]][5]) + Number(color.data[nearColor[0][0]][5]) + Number(color.data[nearColor[1][0]][5]) + Number(color.data[nearColor[2][0]][5])) / 5);
          console.log("no data shadowV " + i)
        }

        this.colorValue[i].rgbShadowColor = this.hsv2rgb(this.colorValue[i].hsvShadowColor);
        this.colorValue[i].hexShadowColor = this.rgb2hex(this.colorValue[i].rgbShadowColor);
        this.colorValue[i].hslShadowColor = this.rgb2hsl(this.colorValue[i].rgbShadowColor);

        // ハイライト
        // nearColorの初期化
        nearColor = [
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360],
          [0, 360]
        ];

        // baseColorに近い色を5個取得
        for(j = 1; j < highlight.data.length; j++){
          csvBaseColor = [highlight.data[j][0], highlight.data[j][1], highlight.data[j][2]];
          len = this.calcLen3d(this.colorValue[i].hsvBaseColor, csvBaseColor);
          if(len < nearColor[5][1]){
            nearColor[5][0] = j;
            nearColor[5][1] = len;

            // バブルソート
            for(k = 0; k < nearColor.length; k++){
              for(l = nearColor.length-1; l > k ; l--){
                if(nearColor[l][1] < nearColor[l-1][1]){
                  tmp1 = nearColor[l][0];
                  tmp2 = nearColor[l][1];
                  nearColor[l][0] = nearColor[l-1][0];
                  nearColor[l][1] = nearColor[l-1][1];
                  nearColor[l-1][0] =tmp1;
                  nearColor[l-1][1] =tmp2;
                }
              }
            }
          }
        }

        // ハイライトHの決定
        highlightH = Math.round((Number(highlight.data[nearColor[0][0]][3]) + this.colorValue[i].hsvBaseColor[0])/2);
        this.colorValue[i].hsvHighlightColor[0] = highlightH;

        // ハイライトSの決定
        highlightS = [
          [highlight.data[nearColor[0][0]][0], highlight.data[nearColor[0][0]][1], highlight.data[nearColor[0][0]][2], highlight.data[nearColor[0][0]][4]],
          [highlight.data[nearColor[1][0]][0], highlight.data[nearColor[1][0]][1], highlight.data[nearColor[1][0]][2], highlight.data[nearColor[1][0]][4]],
          [highlight.data[nearColor[2][0]][0], highlight.data[nearColor[2][0]][1], highlight.data[nearColor[2][0]][2], highlight.data[nearColor[2][0]][4]],
          [highlight.data[nearColor[3][0]][0], highlight.data[nearColor[3][0]][1], highlight.data[nearColor[3][0]][2], highlight.data[nearColor[3][0]][4]],
          [highlight.data[nearColor[4][0]][0], highlight.data[nearColor[4][0]][1], highlight.data[nearColor[4][0]][2], highlight.data[nearColor[4][0]][4]]
        ];

        const hsMaterial = this.multipleRegressionAnalysis(highlightS);
        this.colorValue[i].hsvHighlightColor[1] = parseInt((hsMaterial[0]*baseH) + (hsMaterial[1]*baseS) + (hsMaterial[2]*baseV) + hsMaterial[3]);
        if((this.colorValue[i].hsvHighlightColor[1] < 0)||(this.colorValue[i].hsvHighlightColor[1] > 100)||(isFinite(this.colorValue[i].hsvHighlightColor[1]) === false)){
          this.colorValue[i].hsvHighlightColor[1] = Math.round((Number(highlight.data[nearColor[0][0]][4]) + Number(highlight.data[nearColor[0][0]][4]) + Number(highlight.data[nearColor[0][0]][4]) + Number(highlight.data[nearColor[1][0]][4]) + Number(highlight.data[nearColor[2][0]][4])) / 5);
          console.log("no data highlightS " + i);
        }

        // ハイライトVの決定
        highlightV = [
          [highlight.data[nearColor[0][0]][0], highlight.data[nearColor[0][0]][1], highlight.data[nearColor[0][0]][2], highlight.data[nearColor[0][0]][5]],
          [highlight.data[nearColor[1][0]][0], highlight.data[nearColor[1][0]][1], highlight.data[nearColor[1][0]][2], highlight.data[nearColor[1][0]][5]],
          [highlight.data[nearColor[2][0]][0], highlight.data[nearColor[2][0]][1], highlight.data[nearColor[2][0]][2], highlight.data[nearColor[2][0]][5]],
          [highlight.data[nearColor[3][0]][0], highlight.data[nearColor[3][0]][1], highlight.data[nearColor[3][0]][2], highlight.data[nearColor[3][0]][5]],
          [highlight.data[nearColor[4][0]][0], highlight.data[nearColor[4][0]][1], highlight.data[nearColor[4][0]][2], highlight.data[nearColor[4][0]][5]]
        ];

        const hvMaterial = this.multipleRegressionAnalysis(highlightV);
        this.colorValue[i].hsvHighlightColor[2] = parseInt((hvMaterial[0]*baseH) + (hvMaterial[1]*baseS) + (hvMaterial[2]*baseV) + hvMaterial[3]);
        if((this.colorValue[i].hsvHighlightColor[2] < 0)||(this.colorValue[i].hsvHighlightColor[2] > 100)||(isFinite(this.colorValue[i].hsvHighlightColor[2]) === false)){
          this.colorValue[i].hsvHighlightColor[2] = Math.round((Number(highlight.data[nearColor[0][0]][5]) + Number(highlight.data[nearColor[0][0]][5]) + Number(highlight.data[nearColor[0][0]][5]) + Number(highlight.data[nearColor[1][0]][5]) + Number(highlight.data[nearColor[2][0]][5])) / 5);
          console.log("no data highlightV " + i);
        }

        this.colorValue[i].rgbHighlightColor = this.hsv2rgb(this.colorValue[i].hsvHighlightColor);
        this.colorValue[i].hexHighlightColor = this.rgb2hex(this.colorValue[i].rgbHighlightColor);
        this.colorValue[i].hslHighlightColor = this.rgb2hsl(this.colorValue[i].rgbHighlightColor);

      }
    },
    resetColor(){
      console.log("move reset");
      this.colorValue = [];
    },
    //重回帰分析
    multipleRegressionAnalysis(input){
      let xsum = 0; /* 測定値xの総和を格納する変数xsumを宣言 */
      let ysum = 0; /* 測定値yの総和を格納する変数ysumを宣言 */
      let zsum = 0; /* 測定値zの総和を格納する変数zsumを宣言 */
      let wsum = 0; /* 測定値wの総和を格納する変数wsumを宣言 */
      let xave = 0; /* 測定値xの平均を格納する変数xaveを宣言 */
      let yave = 0; /* 測定値yの平均を格納する変数yaveを宣言 */
      let zave = 0; /* 測定値zの平均を格納する変数zaveを宣言 */
      let wave = 0; /* 測定値wの平均を格納する変数waveを宣言 */

      let n = input.length; /* データ数 */

      let x = new Array(n); /* n個の測定値を格納する配列xを宣言 */
      let y = new Array(n); /* n個の測定値を格納する配列yを宣言 */
      let z = new Array(n); /* n個の測定値を格納する配列zを宣言 */
      let w = new Array(n); /* n個の測定値を格納する配列wを宣言 */
      let xd = new Array(n); /* n個のxの残差の二乗を格納する配列xdを宣言 */
      let yd = new Array(n); /* n個のyの残差の二乗を格納する配列ydを宣言 */
      let zd = new Array(n); /* n個のzの残差の二乗を格納する配列zdを宣言 */
      let wd = new Array(n); /* n個のwの残差の二乗を格納する配列wdを宣言 */
      let xyd = new Array(n); /* n個のxの残差とyの残差との積を格納する配列xydを宣言 */
      let xzd = new Array(n); /* n個のxの残差とzの残差との積を格納する配列xzdを宣言 */
      let yzd = new Array(n); /* n個のyの残差とzの残差との積を格納する配列yzdを宣言 */
      let xwd = new Array(n); /* n個のxの残差とwの残差との積を格納する配列xwdを宣言 */
      let ywd = new Array(n); /* n個のyの残差とwの残差との積を格納する配列ywdを宣言 */
      let zwd = new Array(n); /* n個のzの残差とwの残差との積を格納する配列zwdを宣言 */

      let xdsum = 0; /* xの残差の二乗の総和を格納する変数xdsumを宣言 */
      let ydsum = 0; /* yの残差の二乗の総和を格納する変数ydsumを宣言 */
      let zdsum = 0; /* zの残差の二乗の総和を格納する変数zdsumを宣言 */
      let wdsum = 0; /* wの残差の二乗の総和を格納する変数wdsumを宣言 */
      let xydsum = 0; /* xの残差とyの残差との積の総和を格納する変数xydsumを宣言 */
      let xzdsum = 0; /* xの残差とzの残差との積の総和を格納する変数xzdsumを宣言 */
      let yzdsum = 0; /* yの残差とzの残差との積の総和を格納する変数yzdsumを宣言 */
      let xwdsum = 0; /* xの残差とwの残差との積の総和を格納する変数xwdsumを宣言 */
      let ywdsum = 0; /* yの残差とwの残差との積の総和を格納する変数ywdsumを宣言 */
      let zwdsum = 0; /* zの残差とwの残差との積の総和を格納する変数zwdsumを宣言 */

      let sx2 = 0; // xの分散
      let sy2 = 0; // yの分散
      let sz2 = 0; // zの分散
      let sw2 = 0; // wの分散
      let sxy = 0; // xとyの共分散
      let sxz = 0; // xとzの共分散
      let syz = 0; // yとzの共分散
      let sxw = 0; // xとwの共分散
      let syw = 0; // yとwの共分散
      let szw = 0; // zとwの共分散
      let rxy = 0; // xとyの相関係数
      let rxz = 0; // xとzの相関係数
      let ryz = 0; // yとzの相関係数
      let rxw = 0; // xとwの相関係数
      let ryw = 0; // yとwの相関係数
      let rzw = 0; // zとwの相関係数

      let i;
      let eachdata;
      let det0, det1, det2, det3;
      let a, b, c, d;

      for(i = 0; i < n; ++i){
        eachdata = input[i];

        x[i] = parseFloat(eachdata[0]);
        y[i] = parseFloat(eachdata[1]);
        z[i] = parseFloat(eachdata[2]);
        w[i] = parseFloat(eachdata[3]);

        xsum = xsum + x[i];
        ysum = ysum + y[i];
        zsum = zsum + z[i];
        wsum = wsum + w[i];
      }

      xave = xsum / n;
      yave = ysum / n;
      zave = zsum / n;
      wave = wsum / n;

      for(i = 0; i < n; ++i){
        xd[i] = Math.pow((x[i] - xave),2);
        /* i番目のxの残差の二乗をxd[i]に代入 */
        yd[i] = Math.pow((y[i] - yave),2);
        /* i番目のyの残差の二乗をyd[i]に代入 */
        zd[i] = Math.pow((z[i] - zave),2);
        /* i番目のzの残差の二乗をzd[i]に代入 */
        wd[i] = Math.pow((w[i] - wave),2);
        /* i番目のwの残差の二乗をwd[i]に代入 */
        xyd[i] = (x[i]-xave)*(y[i] - yave);
        /* i番目のxの残差とyの残差との積をxyd[i]に代入 */
        xzd[i] = (x[i] - xave)*(z[i] - zave);
        /* i番目のxの残差とzの残差との積をxzd[i]に代入 */
        yzd[i] = (y[i] - yave)*(z[i] - zave);
        /* i番目のyの残差とzの残差との積をyzd[i]に代入 */
        xwd[i] = (x[i] - xave)*(w[i] - wave);
        /* i番目のxの残差とwの残差との積をxwd[i]に代入 */
        ywd[i] = (y[i] - yave)*(w[i] - wave);
        /* i番目のyの残差とwの残差との積をywd[i]に代入 */
        zwd[i] = (z[i] - zave)*(w[i] - wave);
        /* i番目のzの残差とwの残差との積をzwd[i]に代入 */

        xdsum = xdsum + xd[i];
        ydsum = ydsum + yd[i];
        zdsum = zdsum + zd[i];
        wdsum = wdsum + wd[i];
        xydsum = xydsum + xyd[i];
        xzdsum = xzdsum + xzd[i];
        yzdsum = yzdsum + yzd[i];
        xwdsum = xwdsum + xwd[i];
        ywdsum = ywdsum + ywd[i];
        zwdsum = zwdsum + zwd[i];
      }

      sx2 = xdsum / n;
      sy2 = ydsum / n;
      sz2 = zdsum / n;
      sw2 = wdsum / n;
      sxy = xydsum / n;
      sxz = xzdsum / n;
      syz = yzdsum / n;
      sxw = xwdsum / n;
      syw = ywdsum / n;
      szw = zwdsum / n;

      det0 = sx2*(sy2*sz2-syz*syz)+sxy*(syz*sxz-sxy*sz2)+sxz*(sxy*syz-sy2*sxz);
      det1 = sxw*(sy2*sz2-syz*syz)+sxy*(syz*szw-syw*sz2)+sxz*(syw*syz-sy2*szw);
      det2 = sx2*(syw*sz2-syz*szw)+sxw*(syz*sxz-sxy*sz2)+sxz*(sxy*szw-syw*sxz);
      det3 = sx2*(sy2*szw-syw*syz)+sxy*(syw*sxz-sxy*szw)+sxw*(sxy*syz-sy2*sxz);

      a = det1 / det0;
      b = det2 / det0;
      c = det3 / det0;
      d = wave - (a*xave + b*yave + c*zave);
      rxy = sxy/(Math.sqrt(sx2*sy2));
      rxz = sxz/(Math.sqrt(sx2*sz2));
      ryz = syz/(Math.sqrt(sy2*sz2));
      rxw = sxw/(Math.sqrt(sx2*sw2));
      ryw = syw/(Math.sqrt(sy2*sw2));
      rzw = szw/(Math.sqrt(sz2*sw2));

      const value = [a, b, c, d];

      return value

    },
    //クラスタリング　最短距離法　色相決定
    clustering(h){
      const x = 0; //原点x
      const y = 0; //原点y
      const r = 100; //半径(長さ)

      let i, j, k, l;
      let coordinate = [];
      let clusterNum = [];

      //色相のHを角度とする円座標に変換する
      for(i = 0; i < h.length; i++){
        coordinate.push([x + r * Math.cos(h[i] * (Math.PI / 180)), y + r * Math.sin(h[i] * (Math.PI / 180))]);
        clusterNum.push(i);
      }

      let clusterNumEnd = clusterNum.length;
      let clusterNumSize = clusterNum.length;
      let clusterSizeCheck = clusterNum.length - 1;
      let cluster = []; // 要素1, 要素2, 要素間距離, クラスタの構成要素1, クラスタの構成要素2, クラスタの構成要素n

      let len;
      let lenTmp;
      let minLen = 200;
      let clusterNumTmp1; //追加クラスタのクラスタ番号を保管しておく一時的な変数
      let clusterNumTmp2; //追加クラスタのクラスタ番号を保管しておく一時的な変数

      //クラスタリング
      while(clusterNum.length > 1){
        //minLenの初期化
        minLen = 200;

        for(i = 0; i < clusterNum.length; i++){
          for(j = i + 1; j < clusterNum.length; j++){
            if((clusterNum[i] > clusterSizeCheck) && (clusterNum[j] > clusterSizeCheck)){
              len = 200;
              for(k = 3; k < cluster[clusterNum[i]-clusterNumSize].length; k++){
                for(l = 3; l < cluster[clusterNum[j]-clusterNumSize].length; l++){
                  lenTmp = this.calcLen2d(coordinate[cluster[clusterNum[i]-clusterNumSize][k]], coordinate[cluster[clusterNum[j]-clusterNumSize][l]]);
                  if(lenTmp < len){
                    len = lenTmp;
                  }
                }
              }

            }else if(clusterNum[j] > clusterSizeCheck){
              len = 200;
              for(k = 3; k < cluster[clusterNum[j]-clusterNumSize].length; k++){
                lenTmp = this.calcLen2d(coordinate[clusterNum[i]], coordinate[cluster[clusterNum[j]-clusterNumSize][k]]);
                if(lenTmp < len){
                  len = lenTmp;
                }
              }

            }else{
              len = this.calcLen2d(coordinate[clusterNum[i]], coordinate[clusterNum[j]]);

            }

            if(len < minLen){
              minLen = len;
              clusterNumTmp1 = clusterNum[i];
              clusterNumTmp2 = clusterNum[j];

            }
          }
        }

        if((clusterNumTmp1 > clusterSizeCheck) && (clusterNumTmp2 > clusterSizeCheck)){
          cluster.push([clusterNumTmp1, clusterNumTmp2, minLen]);
          for(i = 3; i < cluster[clusterNumTmp1-clusterNumSize].length; i++){
            cluster[cluster.length-1].push(cluster[clusterNumTmp1-clusterNumSize][i]);
          }
          for(i = 3; i < cluster[clusterNumTmp2-clusterNumSize].length; i++){
            cluster[cluster.length-1].push(cluster[clusterNumTmp2-clusterNumSize][i]);
          }

        }else if(clusterNumTmp2 > clusterSizeCheck){
          cluster.push([clusterNumTmp1, clusterNumTmp2, minLen, clusterNumTmp1]);
          for(i = 3; i < cluster[clusterNumTmp2-clusterNumSize].length; i++){
            cluster[cluster.length-1].push(cluster[clusterNumTmp2-clusterNumSize][i]);
          }
        
        }else{
          cluster.push([clusterNumTmp1, clusterNumTmp2, minLen, clusterNumTmp1, clusterNumTmp2]);
          
        }
        clusterNum = this.arrayElemDel(clusterNum, clusterNumTmp1, clusterNumTmp2);
  
        clusterNum.push(clusterNumEnd);
        clusterNumEnd++;

      }

      for(i = 0; i < cluster.length; i++){
        console.log("elem:" + cluster[i][0] + " " + cluster[i][1]);
        console.log("len:" + cluster[i][2]);
        for(j = 3; j < cluster[i].length; j++){
          console.log(cluster[i][j]);
        }
        console.log("------------");
      }


    },
    calcLen3d(a, b){
      return Math.sqrt(Math.pow( a[0]-b[0], 2 ) + Math.pow( a[1]-b[1], 2 ) + Math.pow( a[2]-b[2], 2 ))

    },
    calcLen2d(a, b){
      return Math.sqrt(Math.pow( a[0]-b[0], 2 ) + Math.pow( a[1]-b[1], 2 ))

    },
    arrayElemDel(array, a, b){
      let tmp1 = array.filter(item => item !== a);
      let tmp2 = tmp1.filter(item => item !== b);

      return tmp2;

    },
    hsv2rgb(input){
      let h = input[0] / 60;
      let s = input[1] / 100;
      let v = input[2] / 100;

      let r, g, b;

      if (s == 0) {
        r = Math.round(v * 255);
        g = Math.round(v * 255);
        b = Math.round(v * 255);
      } else {
        let rgb;
        let i = parseInt(h);
        let f = h - i;
        let v1 = v * (1 - s);
        let v2 = v * (1 - s * f);
        let v3 = v * (1 - s * (1 - f));

        switch (i) {
          case 0:
          case 6:
            rgb = [v, v3, v1];
            break;

          case 1:
            rgb = [v2, v, v1];
            break;

          case 2:
            rgb = [v1, v, v3];
            break;

          case 3:
            rgb = [v1, v2, v];
            break;

          case 4:
            rgb = [v3, v1, v];
            break;

          case 5:
            rgb = [v, v1, v2];
            break;

          default:
            rgb = [0, 0, 0];
            break;
        }

        r = Math.round(rgb[0] * 255);
        g = Math.round(rgb[1] * 255);
        b = Math.round(rgb[2] * 255);
      }
      
      const value = [r, g, b];
        
      return value

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