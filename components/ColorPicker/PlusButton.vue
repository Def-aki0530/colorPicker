<template>
  <div class="plus-button">
    <button @click="$emit('addValue')">+</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.plus-button{
  button{
    width: 21%;
    height: 40px;
    font-size: 1rem;
    font-family: 'Roboto', 'Noto Sans JP';
    background: $mainColor;
    border: none;
    border-radius: 5px;
    color: white;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    margin-top: 10px;
    @include mq(md) {
        width: 30%;
    }
  }
}
</style>