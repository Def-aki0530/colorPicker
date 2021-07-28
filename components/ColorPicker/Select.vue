<template>
  <div class="select" :style="{ width: width }">
    <select :value="value" @input="selected">
      <option v-for="option in options" :key="option.code" :value="option.code">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
    },
  },
  methods: {
    selected($event) {
      this.$emit("selected", $event.target.value, this.id);
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  position: relative;
  margin: 0 10px 10px 0;
  &:after {
    content: url('data:image/svg+xml;utf-8,<svg fill="%233B3B3B" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>');
    width: 1rem;
    height: 1rem;
    display: block;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translatey(-70%);
    pointer-events: none;
  }
  select {
    width: 100%;
    height: 40px;
    font-size: 0.8rem;
    font-family: "Roboto", "Noto Sans JP";
    outline: none;
    border: none;
    border-radius: 5px;
    color: $mainColor;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    padding-left: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}
</style>