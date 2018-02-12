<template>
    <div id="uploaer">
        <input type="file" name="aa" ref="upload" @change="imgChange">
        <button @click="fileUploader">uploader</button>


        <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            name= 'avatar'
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
    export default {
        name: 'uploaer',
        data() {
            return {
                fileDate: '',
                imageUrl: '',
                uploadAction: `/api/users/uploader`
            }
        },
        methods: {
            async fileUploader() {
                let formData = new FormData();
                formData.append('avatar', this.fileDate);
                let up = await this.getAjax('/users/uploader', formData, 'POST', {'Content-Type': 'multipart/form-data'});
                console.info(up.data);
            },
            imgChange() {
                this.fileDate = this.$refs.upload.files[0];
                console.info(this.fileDate, 77);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
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

