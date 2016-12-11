<template>
  <div class="cartcontrol">
    <transition name="move">
       <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
       </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"> </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VUE from 'vue'
  export  default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        //Vue 不允许在已经创建的实例上动态添加新的根级响应式属性（root-level reactive properties）。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
        //相当于原生的添加自定义属性
        if (!this.food.count) {
          VUE.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        //当+按钮点击是触发父级组件的事件
        //使用this.$emit派发事件本身 让父组件监听
        this.$emit('addCart',event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
    .cart-add
      color rgb(0,160,220)
    .cart-decrease
      display inline-block
      padding 6px
      .icon-remove_circle_outline
        color #00a0dc
        display inline-block
        font-size 24px
      &.move-enter-active                 //定义元素显示的动画enter-active
        transition all 0.4s linear
        transform  translate3D(0px,0,0) rotate(0deg);
      &.move-leave-active {               //定义元素隐藏时的动画 leave-active
        transition: all 0.4s linear;
        transform rotate(0deg)
      }
      &.move-enter,&.move-leave-active    //定义元素开始进入动画和隐藏后的状态样式
        opacity 0
        transform translate3D(24px,0,0) rotate(180deg)
    .count
      display inline-block
      font-size 10px
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147,153,159)

</style>
