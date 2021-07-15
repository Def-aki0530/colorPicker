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
        <input type="number" min="0" max="360" step="1" v-model="h" @input="hsv2hex">
      </div>
      <div class="input-value">
        <div>S</div>
        <input type="number" min="0" max="100" step="1" v-model="s" @input="hsv2hex">
      </div>
      <div class="input-value">
        <div>V</div>
        <input type="number" min="0" max="100" step="1" v-model="v" @input="hsv2hex">
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
      h: 0,
      s: 0,
      v: 100,
      l: 100,
    }
  },
  methods: {
    hex2rgb() {
      this.hex = this.inputColor.split('');
      this.r = parseInt(this.hex[1].toString() + this.hex[2].toString(), 16);
      this.g = parseInt(this.hex[3].toString() + this.hex[4].toString(), 16);
      this.b = parseInt(this.hex[5].toString() + this.hex[6].toString(), 16);
      this.returnColor = this.inputColor;
    },
    rgb2hex() {
      let rHex = ('0' + Number(this.r).toString(16)).slice(-2);
      let gHex = ("0" + Number(this.g).toString(16)).slice(-2);
      let bHex = ("0" + Number(this.b).toString(16)).slice(-2);
      this.returnColor = "#" + rHex + gHex + bHex;
      this.inputColor = this.returnColor;
    },
    hsv2hex(){

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