<template>
  <div class="input-color">
    <label class="color-preview" :style="{background: color}" for="id1" ></label>
    <input type="color" class="chose-color" id="id1" value="#ffffff" v-model="color">
    <div class="eyedropper-area">
      <ColorPickerEyedropper />
    </div>
    <div class="chose-colorcode-area">
      <div class="chose-colorcode">
        <div>R</div>
        <input type="number" min="0" max="255" step="1" value="255">
      </div>
      <div class="chose-colorcode">
        <div>G</div>
        <input type="number" min="0" max="255" step="1" value="255">
      </div>
      <div class="chose-colorcode">
        <div>B</div>
        <input type="number" min="0" max="255" step="1" value="255">
      </div>  
    </div>
  </div>
</template>

<script> 
export default {
  data() {
    return {
      color: '#ffffff'
    }
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

.chose-colorcode-area{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chose-colorcode{
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