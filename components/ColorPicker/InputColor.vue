<template>
  <div class="input-color">
    <label class="color-preview" :style="{background: returnColor}" :for="id" ></label>
    <input type="color" class="chose-color" :id="id" v-model="inputColor" @input="hex2rgb">
    <div class="eyedropper-area">
      <ColorPickerEyedropper />
    </div>
    <div class="input-value-area" v-if="colorSpace === '1'">
      <div class="input-value">
        <div>R</div>
        <input type="number" min="0" max="255" step="1" v-model="r" @input="rgb2hex">
      </div>
      <div class="input-value">
        <div>G</div>
        <input type="number" min="0" max="255" step="1" v-model="g" @input="rgb2hex">
      </div>
      <div class="input-value">
        <div>B</div>
        <input type="number" min="0" max="255" step="1" v-model="b" @input="rgb2hex">
      </div>  
    </div>
    <div class="input-value-area" v-if="colorSpace === '2'">
      <div class="input-value">
        <div>H</div>
        <input type="number" min="0" max="360" step="1" v-model="hv" @input="hsv2rgb">
      </div>
      <div class="input-value">
        <div>S</div>
        <input type="number" min="0" max="100" step="1" v-model="sv" @input="hsv2rgb">
      </div>
      <div class="input-value">
        <div>V</div>
        <input type="number" min="0" max="100" step="1" v-model="vv" @input="hsv2rgb">
      </div>  
    </div>
    <div class="input-value-area" v-if="colorSpace === '3'">
      <div class="input-value">
        <div>H</div>
        <input type="number" min="0" max="360" step="1" v-model="hl" @input="hsl2rgb">
      </div>
      <div class="input-value">
        <div>S</div>
        <input type="number" min="0" max="100" step="1" v-model="sl" @input="hsl2rgb">
      </div>
      <div class="input-value">
        <div>L</div>
        <input type="number" min="0" max="100" step="1" v-model="ll" @input="hsl2rgb">
      </div>  
    </div>
  </div>
</template>

<script> 
export default {
  props: {
    id: {
      type: String,
    },
    colorSpace: {
      type: String,
    }

  },
  data() {
    return {
      inputColor: '#ffffff',
      returnColor: '#ffffff',
      hex: '',
      r: 255,
      g: 255,
      b: 255,
      hv: 0,
      sv: 0,
      vv: 100,
      hl: 0,
      sl: 0,
      ll: 100,
    }
  },
  methods: {
    hex2rgb() {
      this.hex = this.inputColor.split('');
      this.r = parseInt(this.hex[1].toString() + this.hex[2].toString(), 16);
      this.g = parseInt(this.hex[3].toString() + this.hex[4].toString(), 16);
      this.b = parseInt(this.hex[5].toString() + this.hex[6].toString(), 16);
      this.rgb2hsv();
      this.rgb2hsl();
      this.returnColor = this.inputColor;
    },
    rgb2hex() {
      let rHex = ("0" + Number(this.r).toString(16)).slice(-2);
      let gHex = ("0" + Number(this.g).toString(16)).slice(-2);
      let bHex = ("0" + Number(this.b).toString(16)).slice(-2);
      this.returnColor = "#" + rHex + gHex + bHex;
      if(this.colorSpace === '1'){
        this.rgb2hsl();
        this.rgb2hsv();
      }
      else if(this.colorSpace === '2'){
        this.rgb2hsl();
        this.hl = this.hv;
      }
      else if(this.colorSpace === '3'){
        this.rgb2hsv();
        this.hv = this.hl;
      }
      this.inputColor = this.returnColor;
    },
    rgb2hsv() {
      let r = this.r / 255 ;
      let g = this.g / 255 ;
      let b = this.b / 255 ;

      let max = Math.max(r, g, b) ;
      let min = Math.min(r, g, b ) ;
      let diff = max - min ;

      let h = 0 ;

      switch(min) {
        case max :
          h = 0 ;
          break ;

        case r :
          h = (60 * ((b - g) / diff)) + 180 ;
          break ;

        case g :
          h = (60 * ((r - b) / diff)) + 300 ;
          break ;

        case b :
          h = (60 * ((g - r) / diff)) + 60 ;
          break ;
      }

      let s = max == 0 ? 0 : diff / max ;
      let v = max ;

      this.hv = Math.floor(h);
      this.sv = Math.floor(s*100);
      this.vv = Math.floor(v*100);
    },
    hsv2rgb() {
      let h = this.hv / 60 ;
	    let s = this.sv / 100;
    	let v = this.vv / 100;
	    if (s == 0){
        this.r = v * 255;
        this.g = v * 255;
        this.b = v * 255;
      }
      else {
        let rgb ;
        let i = parseInt(h) ;
        let f = h - i ;
        let v1 = v * (1 - s) ;
        let v2 = v * (1 - s * f) ;
        let v3 = v * (1 - s * (1 - f)) ;

        switch( i ) {
          case 0 :
          case 6 :
            rgb = [ v, v3, v1 ] ;
            break ;

          case 1 :
            rgb = [ v2, v, v1 ] ;
            break ;

          case 2 :
            rgb = [ v1, v, v3 ] ;
            break ;

          case 3 :
            rgb = [ v1, v2, v ] ;
            break ;

          case 4 :
            rgb = [ v3, v1, v ] ;
            break ;

          case 5 :
            rgb = [ v, v1, v2 ] ;
            break ;
          
          default :
            rgb = [ 0, 0, 0 ] ;
            break ;
        }

        this.r = Math.floor(rgb[0] * 255);
        this.g = Math.floor(rgb[1] * 255);
        this.b = Math.floor(rgb[2] * 255);
        this.rgb2hex();
      }
    },
    rgb2hsl() {
      let r = this.r;
      let g = this.g;
      let b = this.b;

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
        h = hp * ((r - g) / (max - min)) + HUE_MAX * 2 / 3;
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
          s = (max - min) / (max + min) * SATURATION_MAX;
        }
      } else {
        s = (max - min) / (RGB_MAX * 2 - max - min) * SATURATION_MAX;
      }

      // Lightness
      l = (max + min) / RGB_MAX / 2 * LIGHTNESS_MAX;

      if(isNaN(s)){
        s = 0;
      }
      
      this.hl = Math.floor(h);
      this.sl = Math.floor(s);
      this.ll = Math.floor(l);
    },
    hsl2rgb() {
      let h = this.hl;
      let s = this.sl;
      let l = this.ll;

      const RGB_MAX = 255;
      const HUE_MAX = 360;
      const SATURATION_MAX = 100;
      const LIGHTNESS_MAX = 100;
      let r, g, b, max, min;
      
      h = h % HUE_MAX;
      s = s / SATURATION_MAX;
      l = l / LIGHTNESS_MAX;
      
      if (l < 0.5) {
        max = l + l * s;
        min = l - l * s;
      } else {
        max = l + (1 - l) * s;
        min = l - (1 - l) * s;
      }
      
      const hp = HUE_MAX / 6;
      const q = h / hp;
      if (q <= 1) {
        r = max;
        g = (h / hp) * (max - min) + min;
        b = min;
      } else if (q <= 2) {
        r = ((hp * 2 - h) / hp) * (max - min) + min;
        g = max;
        b = min;
      } else if (q <= 3) {
        r = min;
        g = max;
        b = ((h - hp * 2) / hp) * (max - min) + min;
      } else if (q <= 4) {
        r = min;
        g = ((hp * 4 - h) / hp) * (max - min) + min;
        b = max;
      } else if (q <= 5) {
        r = ((h - hp * 4) / hp) * (max - min) + min;
        g = min;
        b = max;
      } else {
        r = max;
        g = min;
        b = ((HUE_MAX - h) / hp) * (max - min) + min;
      }

      this.r = Math.floor(r * RGB_MAX);
      this.g = Math.floor(g * RGB_MAX);
      this.b = Math.floor(b * RGB_MAX);
      this.rgb2hex();
    },
  }
}
</script>

<style scoped lang="scss">
.input-color{
  display: flex;
  align-items: space-between;
  position: relative;
}

.color-preview{
  width: 100px;
  height: 100px;
  border-radius: 5px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
  cursor: pointer;
}

.chose-color{
  width: 0;
  height: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  opacity: 0;
}

.eyedropper-area{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 65px;
  left: 65px;
  border-radius: 15px;
  background: rgba($mainColor, 0.5);
  pointer-events: none;
}

.input-value-area{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-value{
  display: flex;
  align-items: center;
  div{
    width: 26px;
    font-size: 0.8rem;
    color: $mainColor;
    padding: 0 8px;
  }
  input{
    width: 90px;
    height: 28px;
    font-size: 0.8rem;
    font-family: 'Roboto', 'Noto Sans JP';
    color: $mainColor;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 5px;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    &::-webkit-inner-spin-button{
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }

}

</style>