<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo":class="{'heightlight':totalCount > 0}">
            <span class="icon icon-shopping_cart" :class="{'heightlight':totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heightlight':totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{delivaeryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass=payClass">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          name="drop"
          v-for="ball in balls">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
        </transition>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-head">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cart from '../cartcontrol/cartontrol.vue'
  export  default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
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
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
        ],
        dropBalls: [],
        fold:true            //用于控制购物车详情的展开或者隐藏
      }
    },
    //计算属性
    computed:{
      //总价totalprice
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
      },
      //起送价格计算
      payDesc() {
        if(this.totalPrice === 0){
          return `￥${this.minPrice}元起送`;
        }else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        }else{
          return "去结算";
        }
      },
      //结算按钮显示状态
      payClass() {
        if(this.totalPrice < this.minPrice){
          return "no-enough"
        }else{
          return "enough"
        }
      },
      //控制购物车详情是否可以显示
      listshow() {
        //如果商品数量为零表示  不可以展开
        if (!this.totalCount) {
          //设置状态为折叠
          this.fold = true;
          //购物车详情不渲染
          return false;
        }
        //如果不为空
        let show = !this.fold;
        console.log(show)
        return show;

      }
    },
    methods: {
      drop(el) {
        //这里的el指向的是+号按钮
        for(let i=0;i<this.balls.length;i++){
          let ball = this.balls[i];
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      //购物车显示隐藏切换
      toggleList(){
        if(!this.totalCount){
          return;
        }
        this.fold = !this.fold;
      },
      beforeEnter(el) {
        //el指向的是运动的dom
        let count = this.balls.length;
        while(count--){
          let ball = this.balls[count];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            //设置购物车内的小球开始运动的起始位置  y轴为负数  相对自身偏移的位子
            let x = rect.left - 32;
            let y = -(window.innerHeight -  rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            //获取运动元素内的小球
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        let rg = el.offsetHeight;
        this.$nextTick(() => {
           el.style.webkitTransform = 'translate3d(0,0,0)';
           el.style.transform = 'translate3d(0,0,0)';
          //获取运动元素内的小球
           let inner = el.querySelector('.inner-hook');
           inner.style.webkitTransform = 'translate3d(0,0,0)';
           inner.style.transform = 'translate3d(0,0,0)';
        })
      },
      afterEnter(el) {
         let ball = this.dropBalls.shift();
         if (ball) {
           ball.show = false;
           el.style.display = 'none';
         }
      }
    },
    components: {
      "cartcontrol" : cart
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
            &.heightlight
              background rgb(0,160,220)
            .icon
              line-height 44px
              font-size 24px
              color #80858a
              &.heightlight
                color #ffffff
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
          &.heightlight
            color #ffffff
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
          &.no-enough
            background #2b333b
          &.enough
            background #00b43c
            color #ffffff
      .ball-container
        .ball
          position fixed
          left 32px
          bottom 22px
          z-index 100
          transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width 16px
            height 16px
            border-radius 8px
            background  rgb(0,160,220)
            transition all 0.4s linear
      .shopcart-list
        position: absolute
        top 0
        left 0
        z-index -1
        width 100%
        transition all 1s;
        &.fold-enter-active                 //定义元素显示的动画enter-active
          transform  translate3d(0,-200px,0);
        &.fold-enter                        //定义元素开始进入动画和隐藏后的状态样式
          transform  translate3d(0,0,0)
</style>
