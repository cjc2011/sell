<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评价</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"  :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div  class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span v-for="item in rating.recommend" class="item">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import star from 'components/star/star';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';
  import {formatDate} from '../../common/js/date';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERROR = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,        //默认为查看全部评价
        onlyContent: true     //默认只看有内容评价
      };
    },
    created() {
      this.$http.get('./api/ratings').then((response) => {
        response = response.body;
        if(response.erron !== ERROR){
          this.ratings = response.data;
          this.$nextTick(() => {
            if(!this.scroll){
              this.scroll = new Bscroll(this.$refs.ratings,{
                click:true
              })
            }
          })

        }
      })
    },
    filters: {
      formatDate(time){
        //拿到时间戳先转化成时间对象
        let data = new Date(time);
        //把时间对象传给封装的函数  用来转换成可用的文本格式
        return formatDate(data,'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'star': star,
      'ratingselect':ratingselect,
      'split':split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position: absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        padding 6px 0
        flex 0 0 137px
        width 137px
        border-right 1px solid rgb(7,17,27,0.1)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          font-size 24px
          line-heihgt 28px
          color rgb(255,153,0)
        .title
          margin-bottom 8px
          font-size 12px
          line-height 12px
          color rgb(7,17,27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(149,153,159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding 6px 0 6px 12px
        .score-wrapper
          margin-bottom 8px
          line-height 18px
          font-size 0
          .title
            vertical-align top
            font-size 12px
            line-height 18px
            color rgb(7,17,27)
          .star
            vertical-align top
            display inline-block
            margin 0px 12px
            vertical-align top
            @media only screen and (max-width: 320px)
              margin 0px 6px
          .score
            vertical-align top
            display inline-block
            font-size 10px
            line-height 18px
            color  rgb(255,153,0)
        .delivery-wrapper
          font-size 0
          .title
            font-size 12px
            line-height 12px
            color rgb(7,17,27)
          .delivery
            font-size 12px
            color rgb(147,153,159)
            margin-left 15px
    .rating-wrapper
      font-size 0
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            width 28px
            height 28px
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
            margin-bottom 4px
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147,153,159)
          .text
            line-height 18px
            color rgb(7,17,27)
            font-size 12px
            margin-bottom 8px
          .recommend
            line-height 16px
            .icon-thumb_up,.item
              display inline-block
              font-size 12px
              margin 0 8px 4px 0px
            .icon-thumb_up
              color rgb(0,160,220)
            .item
              padding 0 6px
              border 1px solid rgba(7,17,27.0.1)
              border-radius 2px
              color rgb(147,153,159)
              background #ffffff
          .time
            font-size 10px
            color rgb(147,153,159)
            line-height 12px
            position absolute
            right 9px
            top 0px
</style>
