<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menWrapper" >
      <ul>
        <li v-for="(item,index)item in goods" class="menu-item"  :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
             <span v-show="item.type > 0" :class="classMap[item.type]"  class="icon"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li class="food-list food-list-hook"  v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
              <div class="icon">
                <img width="57px" height="57px" :src="food.icon" alt="商品图片">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartontrol v-on:addCart="drop" :food="food"></cartontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--绑定组件时用ref="组件名"   绑定dom元素时用:ref='名称'-->
    <shopcart ref="shopcart" :selectFoods="selectfoods" :delivaery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>

    <food ref="food" v-on:add="drop" v-on:addFrist='drop' :food="selectedFood" ></food>


  </div>

</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import shopCart from 'components/shopcart/shopcart.vue';
  import cart from '../cartcontrol/cartontrol.vue'
  import food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: [],
        listHeight: [],
        scrollY:0,
        selectedFood:{}
      }
    },
    //计算属性
    computed: {
      currentIndex() {
        for(let i=0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || this.scrollY >= height1 && this.scrollY < height2){
            return i;
          }
        }
        return 0;
      },
      selectfoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count){
              foods.push(food)
            }
          })
        })
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease','discount','spaecial','invoice','guarantee'];
      this.$http.get('./api/goods').then((response) => {
        response = response.body;
        if (response.errno == ERR_OK ) {
          this.goods = response.data;
          this.$nextTick(() =>{
            this.initScroll();
            this.calculateHeight();
          })
        }
      })
    },
    //定义事件
    methods: {
      //打开商品详情页事件
      selectFood (food, event) {
        if (!event._constructed){
          return
        }
        this.selectedFood = food;
        this.$refs.food.show()
      },
      initScroll () {
        this.meunScroll = new Bscroll(this.$refs.menWrapper,{
          click:true
        });
        this.foodScroll = new Bscroll(this.$refs.foodWrapper,{
          probeType: 3,
          click:true
        });
        this.foodScroll.on('scroll',(pos)=> {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      calculateHeight() {
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i=0; i<foodList.length; i++) {
          let item = foodList[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index,event) {
        if(!event._constructed){
          return
        }
        let foodList = this.$refs.foodWrapper.querySelectorAll('.food-list-hook');
        let ele = foodList[index];
        this.foodScroll.scrollToElement(ele,300)
      },
      drop(el) {
        this.$refs.shopcart.drop(el)
      }
    },
    components: {
      'shopcart': shopCart,
      'cartontrol': cart,
      'food': food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position: absolute
    top 174px
    width 100%
    bottom 46px
    overflow hidden
    display flex
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          background #ffffff
          position: relative
          margin-top -1px
          z-index 10
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px
          vertical-align top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.spaecial
            bg-image('special_3')
        .text
          font-size 12px
          display table-cell
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #dd9e1
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display  flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            color rgb(7,17,27)
            line-height 14px
            margin 2px 0 8px 0
          .desc, .extra
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159 )
          .desc
            margin-bottom 8px
            line-height 12px
          .count
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
            position absolute
            right 0px
            bottom 12px
</style>
