<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{ratings.length - positives.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="swich border-1px" :class="{'on':onlyContent}" >
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings:{
        type:Array,
        default (){
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all:'全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    //定义事件
    methods: {
      select (type, event){
        if (!event._constructed) {
          return
        }
        this.$emit('select',type);
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggleContent',this.onlyContent)
        //this.onlyContent = !this.onlyContent;
      }
    },
    //计算属性
    computed: {
      positives(){
        return this.ratings.filter((ra) => {
          return ra.rateType === POSITIVE;
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import  "../../common/stylus/mixin.styl";

  .ratingselect
    font-size 12px
    .rating-type
      font-size 0px
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7,17,27,0.1))
      .block
        display inline-block
        padding 8px 12px
        border-radius 2px
        margin-right 8px
        font-size 12px
        color: rgb(77,85,93)
        &.active
          color #ffffff
        .count
          font-size 8px
          line-height 16px
        &.positive
          background rgba(0,160,220,0.2)
          &.active
            background rgb(0,160,220)
        &.negative
          background  rgba(77,85,93,0.2)
          &.active
            background  rgb(77,85,93)
    .swich
      padding 12px 18px
      line-height 24px
      border-1px(rgba(7,17,27,0.1))
      color: rgb(147,153,159)
      font-size 0px
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        font-size 12px

</style>
