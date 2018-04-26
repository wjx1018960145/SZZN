<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
 </template>
<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem.vue'
  import ScrollBar from '../../../../components/ScrollBar/index.vue'
  export default {
      name:'Sidebar',
      data(){
      return{
    }
  },
    components:{
       SidebarItem, ScrollBar
    },
    methods:{

    },
    computed:{
      ...mapGetters([
          'sidebar'
      ]),
      routes() {
        return this.$store.getters.routers
        //return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }

  }

</script>
<style>

</style>
