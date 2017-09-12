<template>
    <div id="admin">
        <navs class="more">
            <navsitem to="/" label="更多" index="1" direction="bottom">
                <router-link to="/abouts">产品介绍</router-link>
                <router-link to="/css">CSS3样式收集</router-link>
                <router-link to="/admin/login">登录</router-link>
                <router-link to="/news">问题列表</router-link>
                <router-link to="/addnews">发布问题</router-link>
                <router-link to="/outexcel">导出excel</router-link>
            </navsitem>
        </navs>
        <headers></headers>
    </div>
</template>
<script>
import Nav from '@/plugin/nav/nav.vue'
import navsitem from '@/plugin/nav/nav-item.vue'
import headers from '@/include/header'
export default {
    data() {
        return {

        }
    },
    components: {
        navs: Nav,
        navsitem: navsitem,
        headers
    }
}
</script>
<style lang="sass" scoped type="text/sass">
    #admin
        display: inline-block
    
</style>


