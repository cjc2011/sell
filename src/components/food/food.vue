<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" />
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}</span>
            </div>
            <div class="price">
              <span class="now">${{food.price}}</span>
              <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol v-on:addCart="add"  :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click="addFrist(food,$event)" class="buy" v-show="!food.count || food.count===0" >加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <div class="title">商品详情</div>
            <p  class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <div class="title">商品评价</div>
            <ratingselect v-on:toggleContent="Content"  v-on:select="active" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                  </div>
                  <div class="time">
                    {{rating.rateTime | formatDate}}
                  </div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>

        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import Vue from 'vue'
  import {formatDate} from '../../common/js/date';
  import cartcontrol from '../cartcontrol/cartontrol.vue'
  import split from '../split/split.vue';
  import ratingSelect from '../ratingselect/ratingselect.vue'


  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    //接受伏组件的数据
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,        //默认为查看全部评价
        onlyContent: false,     //默认只看有内容评价
        desc: {
          all: '全部',
          positive: "推荐",
          negative:"吐槽"
        }
      }
    },
    //定义的方法
    methods: {
      //用来控制是否显示  与select关联起来
      needShow(type,text){
        if(this.onlyContent && !text){
          //如果用户选中了 只看有内容的评价并且这条评价没有没有内容 返回false
          return false
        }
        if(this.selectType === ALL  ){
          //如果用户选择了查看所有内容  返回true
          return true
        }else{
          //如果用户选择了查看点赞的用户 或者是吐槽的用户  判断对象的type和选择的type是否一致
          //如果这条评价为吐槽 用户选择的为点赞则返回false
          return type === this.selectType;
        }

      },
      show () {
        this.showFlag = true;
        //每次点击展开商品详情的时候都默认为查看全部评价
        //状态初始化
        this.selectType = ALL;
        this.onlyContent = false;
        //当页面展示的时候调用Bscroll
        this.$nextTick(() => {
          if(!this.sroll){
            this.scroll = new Bscroll(this.$refs.food,{
              click : true
            })
          }else{
            this.scroll.refresh();
          }
        })
      },
      hide () {
        this.showFlag = false;
      },
      //添加第一个商品事件
      addFrist (food,event) {
        if (!event._constructed) {
            return
        }
        //当+按钮点击是触发父级组件的事件
        //使用this.$emit派发事件本身 让父组件监听
        //console.log(event.target)
        this.$emit('addFrist',event.target);
        //相当于给对象添加自定义属性
        Vue.set(food,"count",1)

      },
      add (el) {
        this.$emit("add",event.target);
      },
      //监听子组件的查看评价(全部 推荐  吐槽)
      active(type){
        this.selectType = type;
      },
      Content (bool) {
        this.onlyContent = !this.onlyContent;
      }
    },
    //注册组件
    components: {
      "cartcontrol": cartcontrol,
      "split":split,
      "ratingselect": ratingSelect
    },
    //定义一个filter过滤器
    filters: {
      formatDate(time){
        //拿到时间戳先转化成时间对象
        let data = new Date(time);
        //把时间对象传给封装的函数  用来转换成可用的文本格式
        return formatDate(data,'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    left 0
    top 0
    bottom 48px
    z-index 5
    width 100%
    background #ffffff
    transform  translate3D(0px,0,0)
    transition all 0.3s linear
    &.move-enter-active                 //定义元素显示的动画enter-active
      transform translate3D(100%,0,0)
    &.move-leave-active {               //定义元素隐藏时的动画 leave-active

    }
    &.move-enter,&.move-leave-active    //定义元素开始进入动画和隐藏后的状态样式
      transform translate3D(100%,0,0)
    .image-header
      position relative
      width 100%
      height 0
      padding-bottom 100%
      img
        position absolute
        width 100%
        height 100%
        top 0
        left 0
      .back
        position: absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #ffffff
    .content
      padding 18px
      position relative
      .title
        margin-bottom 8px
        fonts-size 14px
        font-weight 700
        color rgb(7,17,27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        height 10px
        .sell-count,.rating
          font-size 10px
          color rgb(147,153,159)
          padding 0px
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147,153,159)
    .cartcontrol-wrapper
      position  absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      line-height 24px
      height 24px
      padding 0 12px
      -webkit-box-sizing:  border-box
      -moz-box-sizing:  border-box
      box-sizing:  border-box
      font-size 10px
      border-radius 12px
      color #ffffff
      background rgb(0,160,220)
      transition all 0.2s linear
      &.fade-enter-active                      //元素的进场动画开始状态
        opacity 1
      &.fade-leave-active                       //元素隐藏是的开始状态
        opacity 1
      &.fade-enter,&.fade-leave-active         //当元素运动结束的状态样式
        opacity 0
    .info
      padding 18px
      .text
        line-height 24px
        font-size 12px
        color rgb(77, 85, 93)
      .title
        line-height 14px
        margin-bottom 16px
        font-size 17px
        color rgb(7,17,27)
    .rating
      background #ffffff
      padding 18px 0
      .title
        font-size 14px
        margin-left 18px
        line-heihgt 14px
        //margin-bottom 6px
        color rgb(7,17,27)
      .rating-wrapper
        padding 0px 18px
        .rating-item
          position: relative
          padding 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              vertical-align top
              font-size 10px
              color: rgb(177,153,159)
              margin-right 6px
            .avatar
              border-radius 50%


          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
          .icon-thumb_up,.icon-thumb_down
            margin-right 4px
            font-size 12px
            line-height 24px
            color: rgb(0,160,220)
          .icon-thumb_up
            color: rgb(0,160,220)
        .no-rating
          padding 16px 0px
          font-size 12px
          color rgb(147,153,159)
</style>
