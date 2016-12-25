<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36"  :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div  class="content">
              <span class="strong">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div  class="content">
              <span class="strong">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div  class="content">
              <span class="strong">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-warpper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picwarpper">
          <ul class="pic-list" ref="piclist">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  star from '../../components/star/star.vue';
  import split from '../../components/split/split.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      seller: {
        type: Object,
        default:{}
      }
    },
    data() {
      return {
        favorite: false
      }
    },
    components: {
      "star": star,
      "split":split
    },
    created() {
      this.classMap = ['decrease','discount','spaecial','invoice','guarantee'];
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '未收藏';
      }
    },
    //wathc 用来监听一些值的变化
    // watch:{
    //   seller(){
    //     this._initScroll();
    //   }
    // },
    // methods: {
    //   _initScroll() {
    //     if(!this.scroll){
    //       this.scroll = this.scroll = new BScroll(this.$refs.seller,{
    //         click:true
    //       })
    //     }else{
    //       this.scroll.refresh();
    //     }
    //   }
    // }, 为什么vue2.0 不能watch到seller值初始化
    methods:{
      toggleFavorite(event) {
        if(!event._constructed){
          return
        }
        this.favorite = !this.favorite
      }
    },
    mounted(){
      if(!this.scroll){
        this.scroll = this.scroll = new BScroll(this.$refs.seller,{
          click:true
        })
      }
      if(this.seller.pics){
        //如果有图片 初始化BScroll
        //先获取每个图片的宽度
        let picWidth = 120;
        let margin = 16;
        let width = (picWidth + margin) *  this.seller.pics.length;
        //手动计算ul的实际宽度并赋值
        this.$refs.piclist.style.width = width + 'px';
        this.$nextTick(() => {

          if(!this.picScroll){
            this.picscroll = new BScroll(this.$refs.picwarpper,{
              scrollX: true,
              evetnPassthrough:'vertical'
            })
          }
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    bottom 0px
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      position relative
      .favorite
        position absolute
        right 18px
        top 18px
        line-height 24px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240,20,20)
        .text
          font-size 10px
          line-height 10px
          color #4d555d
      .title
        margin-bottom 8px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .desc
        padding-bottom 18px

        font-size 0
        border-1px(rgba(7,17,27,0.1))
        .star
          display inline-block
          vertical-align top
          margin-right 8px
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          line-height 18px
          color rgb(77,80,93)
          font-size 10px
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7.17.27.0.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7,17,27)
            .strong
              font-size 24px

    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .content-warpper
        padding 0px 12px 16px 12px
        border-1px(rgba(7,17,27,0.1))
        .content
          font-size 12px
          color rgb(240,20,20)
          line-height 24px
      .supports
        font-size 0px
        .support-item
          padding 16px 12px
          font-size 0px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border none
          .icon
            display  inline-block
            width 16px
            height 16px
            margin-right 6px
            background-size 16px
            background-repeat no-repeat
            vertical-align top
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.spaecial
              bg-image('special_4')
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap               //不折行
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
    .info
      padding 18px 18px 0 18px
      .title
        padding-bottom 12px
        font-size 14px
        border-1px(rgba(7,17,27,0.1))
        color rgb(7,17,27)
        line-height 14px
      .info-item
        padding 16px 12px
        line-height 16px
        border-1px(rgba(7,17,27,0.1))
        color rgb(7,17,27)
        font-size 12px
        &:last-child
          border none
</style>
