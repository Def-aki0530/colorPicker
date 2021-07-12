<template>
  <div class="header-container">
    <div class="header-left">
        hogehoge
    </div>
    <div class="header-right">
        <nuxt-link to="/" :class="{border:index}">色決定</nuxt-link>
        <nuxt-link to="guide" :class="{border:guide}">使い方</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      index: false,
      guide: false,
    } 
  },
  mounted() {
    if( this.$route.name == 'index' ){
      this.index = true
    }
    if( this.$route.name == 'guide' ){
      this.guide = true
    }
  }
}
</script>

<style scoped lang="scss">
.header-container{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $mainColor;
  color: white;
}

.header-left{
  margin-left: 30px;
}

.header-right{
  display: flex;
  margin-right: 15px;
  a{
    color: white;
    text-decoration: none;
    padding: 5px;
    margin: 0 10px;
    cursor: pointer;
  }
}

.border{
  border-bottom: white solid 2px ;
}
</style>