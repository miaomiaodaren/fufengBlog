<template>
    <div id="chating">
        <div class="aa">以下是实时报价推送 {{justmsg}}</div>
        <div class="main-top">
            socket.io demo
        </div>
        <div class="main-body" ref="main_html">
            <section class="chatRoomInfo">
                <div class="info">当前共有<span class="chatNum">{{UserList.onlineCount}}</span>人在线。在线列表:&nbsp;<span class="chatList">{{UserList.userList}}</span></div>
            </section>
        </div>
        <div class="main-footer clearfix">
            <div class="input">
                <input type="text" name="msg" id="msg" value="" v-model="messages" />
            </div>
            <button type="button" class="send" @click="send">发送</button>
        </div>
    </div>
</template>
<script>
    import * as io from 'socket.io-client'
    import { uniqueId, append } from '@/assets/util.js'
    import moment from '@/assets/monent.js'
    export default {
        data() {
            return {
                messages: '',
                msgcon: [],
                socket: io.connect('127.0.0.1:3000'),
                User: {
                    userName: '',
                    userId: ''
                },
                UserList: {
                    //当前在线列表
                    onlineUser: '',
                    //当前在线数
                    onlineCount: '',
                    //新加用户
                    user: '',
                    //更新在线人数
                    userList: '',
                    separator: '',
                },
                justmsg: 0
            }
        },
        methods: {
            getSocket() {
                //socket.emit() ：向建立该连接的客户端广播
                //socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
                //io.sockets.emit() ：向所有客户端广播，等同于上面两个的和
                // socket.on('news', function (data) {
                //     console.log(data);
                //     socket.emit('my other event', { my: 'data' });
                // });

                this.socket.on('justdata', (o)=> {
                    console.info(o, '213123123213');
                    this.justmsg = o;
                });

                this.socket.emit('justdata', {id: 2});

                //通知用户有用户登录
                this.socket.emit('login', this.User);
                //监听新用户登录
                this.socket.on('login', (o)=> {
                    this.updateMsg(o, 'login');
                });
                //监听用户退出
                this.socket.on('logout', (o)=> {
                    this.updateMsg(o, 'logout');
                });
                //发送消息
                this.socket.on('message', (obj)=> {
                    let MsgHtml = '';
                    console.info(obj, '我收到了消息！');
                    if(obj.userid == this.User.userId) {
                        MsgHtml= `<section class="user clearfix"><span>${obj.username}</span><div>${obj.content}</div></section>`;
                    } else {
                        MsgHtml= `<section class="server clearfix"><span>${obj.username}</span><div>${obj.content}</div></section>`;
                    }
                    append(this.$refs.main_html, MsgHtml)
                })
            },
            updateMsg(o, action) {
                //当前在线列表
                this.UserList.onlineUser = o.onlineUser;
                //当前在线数
                this.UserList.onlineCount = o.onlineCount;
                //新加用户
                this.UserList.user = o.user;
                for(let key in this.UserList.onlineUser) {
                    this.UserList.userList = '';
                    this.UserList.userList += this.UserList.separator + this.UserList.onlineUser[key];
                    this.UserList.separator = '、';
                }
                console.info(this.UserList, '123123123123123123');
                //系统消息
                if(action=='login') {
                    var sysHtml= '<section class="chatRoomTip"><div>'+ o.user.userName +'进入聊天室</div></section>';
                }
                if(action=="logout") {
                    var sysHtml= '<section class="chatRoomTip"><div>'+ o.user.username +'退出聊天室</div></section>';
                }
                append(this.$refs.main_html, sysHtml)
            },
            send() {
                let content= this.messages;
                if (content) {
                    let obj = {
                        'userid': this.User.userId,
                        'username': this.User.userName,
                        'content': content
                    }
                    this.socket.emit('message', obj);
                    this.messages = '';
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
            // this.User.userName = prompt('请输入您的姓名');
            // if(!this.User.userName) {alert('姓名必填'); history.go(0)};
            // // this.User.userId = uniqueId('User_');
            // this.User.userId = 'User_' + moment().cfordate();
            this.getSocket();
        }
    }
</script>
<style>
    .main-top {
        height: 30px;
        background-color: #3d3d3d;
        text-indent: 15px;
        color: #ffffff;
        font-size: 16px;
        line-height: 30px;
    }

    .main-body {
        background-color: #efeff4;
        position: absolute;
        top: 30px;
        bottom: 50px;
        width: 100%;
        overflow-y: scroll;

    }

    .chatRoomInfo {
        padding: 10px;
        font-size: 12px;
        color: #666;
    }

    .chatRoomTip {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #444;
    }

    .user {
        width: 100%;
        min-height: 38px;
        min-width: 36px;
        margin-bottom: 15px;
    }

    .user span {
        float: right;
    }

    .user div {
        float: right;
        min-height: 38px;
        min-width: 38px;
        max-width: 70%;
        line-height: 38px;
        padding: 0 15px;
        color: #FFFFFF;
        margin-right: 10px;
        word-break: break-all;
        background-color: #007aff;
        position: relative;
        border-radius: 5px;
    }

    .user div:after {
        content: "";
        position: absolute;
        right: -5px;
        top: 4px;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-left: 7px solid #007aff;
        border-bottom: 4px solid transparent;
    }

    .server {
        width: 100%;
        min-height: 38px;
        min-width: 36px;
        margin-bottom: 15px;
    }

    .server span {
        float: left;
    }

    .server div {
        float: left;
        min-height: 38px;
        min-width: 38px;
        max-width: 70%;
        line-height: 38px;
        padding: 0 15px;
        color: #FFFFFF;
        margin-left: 10px;
        word-break: break-all;
        background-color: #007aff;
        position: relative;
        border-radius: 5px;
    }

    .server div:after {
        content: "";
        position: absolute;
        left: -5px;
        top: 4px;
        width: 0;
        height: 0;
        border-top: solid transparent;
        border-right: 7px solid #007aff;
        border-bottom: 4px solid transparent;
    }
    .main-footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
    }
    .input{
        float: left;
        width: 80%;
        height: 40px;
        margin-top: 5px;
        margin-left: 1%;
        margin-right: 1%;
        border: 1px solid #666666;
    }
    .input input{
        width: 100%;
        height: 40px;
        outline: none;
        border: none;
        font-size: 14px;
        color: #333;
    }
    .send{
        float: left;
        width: 16%;
        height: 40px;
        margin-top: 5px;
        margin-left: 1%;
        border: none;
        background-color: #e8e8e8;
        color: #007aff;
        outline: none;
    }
</style>
