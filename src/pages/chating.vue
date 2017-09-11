<!-- <template>
    <div id="chating">
        <div class="xxlist">

        </div>
        <div class="gomsg">
            <el-input v-model="messages" placeholder="请输入内容"></el-input>
            <button @click="send">发送</button>
        </div>
    </div>
</template>
<script>
    import * as io from 'socket.io-client'
    export default {
        data() {
            return {
                messages: '',
                msgcon: []
            }
        },
        methods: {
            getSocket() {
//                socket.emit() ：向建立该连接的客户端广播
//                socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
//                io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
                socket.on('news', function (data) {
                    console.log(data);
                    socket.emit('my other event', { my: 'data' });
                });
            },
            send() {
                if(this.messages === '') {
                    return
                } else {
                    console.log(this.messages);
                    socket.emit('sendMsg', {
                        data: new Date(),
                        loc: 1,
                        form: 'fufeng',
                        content: this.messages
                    });
                    this.msgcon.push({
                        data: new Date(),
                        loc: 1,
                        form: 'fufeng',
                        content: this.messages
                    })
                }
            },
            getMsg() {

            }
        },
        mounted() {
            // this.getSocket();
            // socket.on('receiveMsg', function(data) {
            //     console.log(data); console.log('222');
            //     this.msgcon.push(data);
            // })
        }
    }
</script>
 -->