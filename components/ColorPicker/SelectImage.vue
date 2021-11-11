<template>
  <div class="select-image">
    <label for="file_upload">
      <input
        @change="setImage($event)"
        type="file"
        id="file_upload"
        accept="image/jpeg, image/png"
      />画像を選択
    </label>
    <div class="image-border">
      <img :src="data.image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: {},
      data: {
        image: "",
        name: "",
        type: "",
      },
    };
  },
  methods: {
    setImage(e) {
      this.file = (e.target.files || e.dataTransfer)[0];
      if (this.file) {
        if (this.file.type.startsWith("image/")) {
          this.data.image = window.URL.createObjectURL(this.file);
          this.data.name = this.file.name;
          this.data.type = this.file.type;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.select-image {
  width: 35%;
  height: calc(100vh - 60px);
  padding: 60px;
  @include mq(xl) {
    width: 100%;
    padding: 30px;
  }
  label {
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $mainColor;
    font-size: 0.8rem;
    color: white;
    border-radius: 5px;
    filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.1));
    cursor: pointer;
    input {
      display: none;
    }
  }
}

.image-border {
  width: 100%;
  height: calc(100% - 55px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: $mainColor dashed 2px;
  margin: 15px 0 0 0;
  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
  }
}
</style>