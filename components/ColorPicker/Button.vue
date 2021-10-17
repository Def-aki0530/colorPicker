<template>
  <div class="button">
    <button @click="$emit('buttonEvent')">{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.button {
  button {
    width: 120px;
    height: 40px;
    font-size: 0.8rem;
    font-family: "Roboto", "Noto Sans JP";
    background: $mainColor;
    border: none;
    border-radius: 5px;
    color: white;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
}
</style>