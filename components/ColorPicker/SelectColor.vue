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
      <ColorPickerInputColor />
    </ColorPickerArea>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
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
      ],


    }
  },
  methods: {
    selected(value, id) {

    }
  }
}
</script>

<style scoped lang="scss">
.select-color{
  width: 65%;
  padding: 60px 60px 0 0;
}

.operation{
  display: flex;
}
</style>