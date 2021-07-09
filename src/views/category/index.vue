<template>
  <div class="category">
    <!-- 菜单导航 -->
    <van-list class="menu">
      <menu-tab-bar :list="menu_list" @DataKey="DataKey" />
    </van-list>
    <!-- 分类详情 -->
    <van-list class="content">
      <category-content :list="conent_list" />
    </van-list>
  </div>
</template>

<script>
import {getCategory,getSubcategory} from '@/api/category';
import MenuTabBar from './components/menu';
import CategoryContent from './components/conent';
export default {
  name:'Category',
  components:{MenuTabBar,CategoryContent},
  data() { 
    return {
      menu_list:[],
      mait_key:'',
      conent_list:[]
    }
  },
  computed:{
    show(){
    }
  },
  beforeMount(){
    this.get_category()
    this.get_category_first('3627')
  },
  methods:{
    //获取分类
    get_category(){
      getCategory().then(res => {
        const data = res.data.data.category.list;
        if(data && data.length>0){
          this.menu_list=data;
        }
      })
    },
    get_category_first(mait_key){
      getSubcategory(mait_key).then(res =>{
        const data  = res.data.data.list;
        console.log(data);
        if(data && data.length>0){
          this.conent_list = data;
        }
      })
    },
    DataKey(data){
      this.mait_key = data.maitKey
      this.get_category_first(this.mait_key)
    }
  },
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}
.menu {
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}
.content {
  width: calc(100% - 30%);
  overflow-y: auto;
}
</style>