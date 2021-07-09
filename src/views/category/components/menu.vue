<template>
  <div class="menu">
    <div v-for="(item,index) in menu_list" :key="index">
      <div
        class="title"
        @click="toggle(index,item)"
        :class="menu_index==index ?'current' :''"
      >{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Menu",
  props:{
    list:{
      type:Array,
      default:()=>([])
    }
  },
  data() { 
    return {
      menu_list:[],
      menu_index:''
    }
  },
  methods:{
    toggle(index,item){
      this.menu_index = index;
      this.$emit("DataKey",item)
    }
  },
  watch:{
    list:{
      handler(val){
        this.menu_list=val;
      },immediate:true
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #ccc;
  border-bottom: 1px solid #fff;
}
.current {
  border-right: 3px solid red;
}
</style>