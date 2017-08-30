<template>
    <div id="nav">
        <ul>
            <li>3123123</li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                
            }
        },
        props: {
            label: {
                type: String
            }
        },
        methods: {

        },
        mounted() {
            console.log(this.label);
        }
    }
</script>

