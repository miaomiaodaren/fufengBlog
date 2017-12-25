<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
        }
    },
    beforeCreate() {
        if(localStorage.getItem('user') == 2) {
            localStorage.removeItem('user');
            localStorage.setItem('user', '3')
        } else if(localStorage.getItem('user') == null) {
            localStorage.setItem('user', '1')
        }
    },
    destroyed() {
    },
    mounted() {
        window.addEventListener("storage", function (e) {
            console.info(e, 'woshie');
            localStorage.setItem('user', e.oldValue);
        });
        window.onunload = function() {
            localStorage.setItem('user', '2');
        }
    }
}
</script>

<style lang="sass" scoped type="text/sass">
#app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    height: 100%
</style>
