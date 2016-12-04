<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link  to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link  to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link  to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  export default {
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display flex
      width 100%
      line-height 40px
    .tab-item
      flex 1
      text-align center
    & a
      display block
      font-size 14px
      color rgb(77, 85, 93)
    & a.active
      color red

</style>
