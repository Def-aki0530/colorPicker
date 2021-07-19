<template>
  <div class="result-color">
    <div class="result-color-label">{{ label }}</div>
    <div class="result-color-contents">
      <label class="color-preview" :style="{background: '#ffffff' }"></label>
      <div class="result-value-area" v-if="colorSpace === '1'">
        <div class="result-value">
          <p>R</p>
          <div>255</div>
        </div>
        <div class="result-value">
          <p>G</p>
          <div>255</div>
        </div>
        <div class="result-value">
          <p>B</p>
          <div>255</div>
        </div>  
      </div>
      <div class="result-value-area" v-if="colorSpace === '2'">
        <div class="result-value">
          <p>H</p>
          <div>0</div>
        </div>
        <div class="result-value">
          <p>S</p>
          <div>0</div>
        </div>
        <div class="result-value">
          <p>V</p>
          <div>100</div>
        </div>  
      </div>
      <div class="result-value-area" v-if="colorSpace === '3'">
        <div class="result-value">
          <p>H</p>
          <div>0</div>
        </div>
        <div class="result-value">
          <p>S</p>
          <div>0</div>
        </div>
        <div class="result-value">
          <p>L</p>
          <div>100</div>
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
    },
    colorSpace: {
      type: String,
    },
    label: {
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
    
  }
}
</script>

<style scoped lang="scss">
.result-color{
  width: 30%;
  height: auto;
}

.result-color-label{
  width: 100%;
  font-size: 0.8rem;
  color: $mainColor;
  text-align: center;
  margin-bottom: 10px;
}

.result-color-contents{
  width: 100%;
  display: flex;
  align-items: space-between;
  position: relative;
}

.color-preview{
  width: 46%;
  position: relative;
  border-radius: 5px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
  &::before{
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.result-value-area{
  width: 54%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.result-value{
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  p{
    width: 22%;
    font-size: 0.8rem;
    color: $mainColor;
    text-align: center;
  }
  div{
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