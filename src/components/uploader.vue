<template>
    <div id="uploaer">
        <input type="file" name="aa" ref="upload" @change="imgChange">
        <button @click="fileUploader">uploader</button>
    </div>
</template>
<script>
    export default {
        name: 'uploaer',
        data() {
            return {
                fileDate: '',
            }
        },
        methods: {
            async fileUploader() {
                let formData = new FormData();
                formData.append('avatar', this.fileDate);
                let up = await this.getAjax('/users/uploader', formData, 'POST');
                console.info(up.data);
            },
            imgChange() {
                this.fileDate = this.$refs.upload.files[0];
            }
        }
    }
</script>
<style lang="sass" scoped type="text/sass">
    #uploaer
        width: 90%
        height: px2rem(300)
        margin: 0 auto;
        padding-top: px2rem(60)
        button
            width: px2rem(300)
            heigth: px2rem(60)
            line-height: px2rem(60)
            margin-top: px2rem(60)
</style>

