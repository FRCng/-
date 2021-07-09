<template>
  <div>
    <van-grid :gutter="10" :border="false">
      <van-grid-item v-for="(item,index) in goods_list" :key="index" :text="item.title">
        <template #icon>
          <van-image width="50" height="50" :src="item.image" />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name:"Content",
  props:{
    list:{
      type:Array,
      default:()=>([])
    }
  },
  data() { 
    return {
      goods_list:[]
    }
  },
  watch:{
    list:{
      handler(val){
        if(val){
          this.goods_list = val;
          console.log(this.goods_list);
        }
      },immediate:true
    }
  }
}
</script>

<style lang="" scoped>
</style>