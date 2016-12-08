<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon icon-shopping_cart"></span>
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{delivaeryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{minPrice}}起送
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export  default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      },
      delivaeryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    //计算属性
    computed:{
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        })
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left: 0
    bottom 0
    width 100%
    height 48px
    background #000000
    z-index 8
    .content
      display flex
      background #141d27
      color: rgba(255,255,255,0.4);
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding  6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 28px
          background rgb(20,29,39)
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background rgba(40,50,60,0.6)
            .icon
              line-height 44px
              font-size 24px
              color #80858a
          .num
            position: absolute
            top 0px
            right 0px
            width 24px
            height 16px
            text-align center
            line-height 16px
            font-size 9px
            border-radius 16px
            font-weight 400
            color: #ffffff
            background rgb(240, 20, 20 )
            box-shadow 0 4px 8px rgba(0,0,0,0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 12px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          line-height 48px
          text-align center
          font-weight 700
          font-size 12px
          background #2b333b
</style>
