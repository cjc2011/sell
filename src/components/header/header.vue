<template>
  <div class="header" >
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64"  :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="suppor">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDeail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDeail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <div v-show="detailShow" class="detail" @click="showDeail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>

        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          detailShow: false
        };
      },
      created() {
        this.classMap = ['decrease','discount','spaecial','invoice','guarantee'];
      },
      methods: {
        showDeail(){
          this.detailShow = !this.detailShow
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color #ffffff
    background rgba(7,17,27,0.5)
    position relative
    overflow hidden
    .content-wrapper
      padding 24px 12px 18px 24px
      font-size 0px
      position relative
      .avatar
        display inline-block
        font-size 14px
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        font-size 14px
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            width 30px
            height 18px
            display inline-block
            bg-image('brand')
            background-size 30px 18px
            vertical-align top
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold


        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .suppor
          font-size 10px
          line-height 12px
          font-weight 200
          .icon
            display  inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px
            background-repeat no-repeat
            vertical-align top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')

        .text
          font-size 10px
          color #ffffff
          line-height 12px
          font-weight 200
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background-color rgba(0,0,0,0.2)
        text-align center
        .count
            font-size 10px
            vertical-align  top
        .icon-keyboard_arrow_right
            margin-left 2px
            font-size 10px
            line-height 24px

    .bulletin-wrapper
      height 28px
      overflow hidden
      padding 0 22px 0 12px
      white-space nowrap
      line-height 28px
      text-overflow ellipsis
      position relative
      background rgba(7,17,27,0.2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
        vertical-align middle
      .bulletin-text
        font-size 10px
        margin 0 4px
      .icon-keyboard_arrow_right
        font-size 10px
        position absolute
        right 12px
        top 8px
    .background
      position absolute
      z-index -1
      top -1px
      width 100%
      filter blur(10px)
      -webkit-filter blur(10px)

    .detail
      position fixed
      top 0px
      left 0px
      z-index 10
      height 100%
      width 100%
      overflow auto
      background rgba(7,17,27,0.8)
    .detail-wrapper
     min-height 100%
     width 100%
     .detail-main
      margin-top 64px
      padding-bottom 64px
     .name
       line-height 16px
       font-size 16px
       font-weight 700
       text-align center
  .detail-close
     font-size 10px
     width 32px
     height 32px
     margin -64px auto 0
    .icon-close
      font-size 32px

</style>
