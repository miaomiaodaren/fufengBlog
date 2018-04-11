<template>
    <!-- 在这里添加key,只要路由有变化，就会一定更新插件。 -->
    <router-view name="page" :key="$route.fullPath"></router-view>
</template>
