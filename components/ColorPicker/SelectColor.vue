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
      <ColorPickerButton
        :text="'生成'"
        
      />
      <ColorPickerButton
        :text="'リセット'"
      />
    </div>
    <ColorPickerLabel />

    <ColorPickerArea>
      <ColorPickerInputColor
        :id="'id1'"
        :colorSpace="colorSpace"
      />
    </ColorPickerArea>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
      colorPattern: '1',
      colorSpace: '1',

      defaultPatternNumber: '1',
      patternOptions: [
        { code: '1', name: 'カラーパターン1' },
        { code: '2', name: 'カラーパターン2' },
        { code: '3', name: 'カラーパターン3' },
      ],

      defaultSpaceNumber: '1',
      spaceOptions: [
        { code: '1', name: 'RGB' },
        { code: '2', name: 'HSV' },
        { code: '3', name: 'HSL' },
      ],


    }
  },
  methods: {
    selected(value, id) {
      if(id == 'color-pattern'){
        this.colorPattern = value;
        console.log(this.colorPattern);
      }
      else if(id == 'color-space'){
        this.colorSpace = value;
        console.log(this.colorSpace);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.select-color{
  width: 1248px;
  padding: 60px 60px 0 0;
}

.operation{
  display: flex;
}
</style>