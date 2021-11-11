<template>
  <div class="arrow">
    <button @click="$emit('deleteValue')">×</button>
    <svg
      fill="%233B3B3B"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 24 24"
    >
      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: { Button },
};
</script>

<style scoped lang="scss">
.arrow {
  width: 40%;
  position: relative;
  @include mq(md) {
    width: 20%;
    margin-bottom: 10px;
  }
  button {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5%;
    left: 5%;
    background: $mainColor;
    color: white;
    font-size: 0.8rem;
    font-family: "Roboto", "Noto Sans JP";
    border-radius: 50%;
    border: none;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    @include mq(md) {
      width: 15px;
      height: 15px;
    }
  }
  svg {
    width: 40%;
    height: 40%;
    position: absolute;
    top: 30%;
    left: 30%;
    transform: rotate(-90deg);
    fill: #3b3b3b;
    @include mq(md) {
      transform: rotate(0deg);
    }
  }
}
</style>