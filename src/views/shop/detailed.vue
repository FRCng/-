<template>
  <div>
    <NavBar class="nav-bar">
      <div class="left" slot="left">
        <div>
          <router-link to="/shop" replace> <</router-link>
        </div>
      </div>
      <div class="center" slot="center">
        <span v-for="item in title" :key="item">{{ item }}</span>
      </div>
    </NavBar>
    <!-- swiper -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in itemInfo.topImages" :key="index">
        <img fit="cover" v-lazy="image" class="h350" />
      </van-swipe-item>
    </van-swipe>
    <div class="goods-info">
      <div class="title">{{ itemInfo.title }}</div>
      <div class="price">
        <h3 class="low-price">￥{{ itemInfo.lowNowPrice }}</h3>
        <h5 class="old-price">{{ itemInfo.lowPrice }}</h5>
        <h2 class="discount">{{ discount }}折</h2>
      </div>
    </div>
    <div class="columns">
      <span v-for="item in columns" :key="item.id">{{ item }}</span>
    </div>
    <ul class="shop-info">
      <li v-for="(item, index) in shopInfo.services" :key="index">
        <img :src="item.icom"></img>
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="goods-detailInfo">
      <p class="title">{{detailInfo.desc}}</p>
      <div v-for="(item,index) in detailInfo.detailImage" :key="index">
        <h3>{{item.key}}</h3>
        <template v-for="img in item.list">
          <img fit="cover" v-lazy="img"  />
        </template>
      </div>
    </div>
    <van-goods-action class="cart">
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" @click="show=true" text="加入购物车" />
      <van-goods-action-button type="danger" @click="buy"  text="立即购买" />
    </van-goods-action>
    <van-popup v-model="show" position="bottom" 
  closeable :style="{ height: '70%' }">
  
    <div class="rule">
      <template v-if="itemParams.rule && itemParams.rule.tables">
        <template v-for="item in itemParams.rule.tables">
          <div v-for="(rule,index) in item"  :key="index">
            <div v-for="(child,child_index) in rule" :key="child ">
              {{child}}
              <!-- <template v-if="child_index == 0">
              <div>{{child}}</div>
              </template>
              <template v-if="child_index !==0">
                <van-radio-group v-model="rule_radio">
                  <van-radio :name="child">{{child}}/{{child_index}}</van-radio>
                </van-radio-group>
              </template> -->
            </div>
          </div>
        </template>
      </template>
    </div>
  </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import { Lazyload } from 'vant';
import { GoodsDetailed } from '@/api/shop';
export default {
  name: 'GoodsDetailed',
  data() {
    return {
      show:false,
      iid: this.$route.query.iid,
      itemInfo: {},
      columns: [],
      title: ['商品', '参数', '评论', '推荐'],
      shopInfo: {},
      detailInfo:{},
      itemParams:{},
      rule_radio:""
    };
  },
  components: { NavBar },
  computed: {
    discount() {
      if (this.itemInfo.lowNowPrice && this.itemInfo.lowPrice) {
        return Math.ceil(
          ((this.itemInfo.lowNowPrice / this.itemInfo.lowPrice) * 100) / 10
        );
      }
    },
  },
  created() {
    this.get_goods_detailed();
  },
  methods: {
    buy(){
      let arr = {}
      arr.iid =this.iid
      arr.title =this.itemInfo.title
      arr.num =1
      arr.status = false
      arr.img = this.itemInfo.topImages[0]
      arr.price = this.itemInfo.lowNowPrice
      this.$store.dispatch("cart/buy_goods",arr)
    },
    onBuyClicked(){

    },
    onAddCartClicked(){

    },
    //商品详情
    get_goods_detailed() {
      GoodsDetailed(this.iid).then((res) => {
        console.log(res.data.result);
        const data = res.data.result;
        if (data) {
          this.columns = data.columns;
          this.itemInfo = data.itemInfo;
          this.shopInfo = data.shopInfo;
          this.detailInfo = data.detailInfo
          this.itemParams = data.itemParams
          this.sku = data.itemParams.info
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 100vw;
}
.h350 {
  width: 100%;
  height: 500px;
}
.goods-info {
  margin-top: 25px;
}
.shop-info{
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  img{
    width: 15px;
    height: 15px;
  }
}
.title {
  font-size: 18px;
}
.price {
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  .low-price {
    font-size: 30px;
    color: pink;
  }
  .old-price {
    padding-left: 15px;
    font-size: 15px;
    text-decoration: line-through;
    color: rgba(0, 0, 0, 0.5);
  }
}
.discount {
  width: 60px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  border-radius: 10px;
  text-align: center;
  background-color: palevioletred;
  align-self: flex-start;
}
.columns {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  padding-bottom:15px;
  border-bottom:2px solid gray;
}
.goods-detailInfo{
  margin-top: 20px;
  font-size: 15px;
  .title{
    padding: 15px;
  }
  box-sizing: border-box;
  overflow: hidden;
  h3{
    text-align: center;
  }
  img{
    width: 100vw;
  }
}
.nav-bar {
  width: 100vw;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  z-index: 100;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  .left {
    width: 60px;
    text-align: center;
    font-size: 20px;
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
