<<template>
    <div id="page">
        <div class="page_item gopro" :class="nowPage === 1? 'disable': ''" @click="nowPage !== 1 ? changepage(nowPage -1) : ''"><</div>
        <div class="page_item" @click="changepage(1)" :class="nowPage === 1 ? 'active' : ''">1</div>
        <div class="page_item" @click="gopromorepage" v-if="proshow">...</div>
        <div class="page_item" v-for="(v, index) in showpageList" :key="index" :class="nowPage === v ? 'active': ''" @click="changepage(v)">
            {{v}}
        </div>
        <div class="page_item" @click="gonextmorepage" v-if="nextshow">...</div>
        <div class="page_item" @click="changepage(pageCount)" v-show="pageCount != 1" :class="nowPage === pageCount ? 'active' : ''">{{pageCount}}</div>
        <div class="page_item gonext" :class="nowPage === pageCount? 'disable': ''" @click="nowPage !== pageCount ? changepage(nowPage + 1) : ''">></div>
        <span v-if="gopage">
            前往：<input class="gopage" min='1' @change="gopagesize" v-model="gotopage"></input> 页
        </span>
    </div>
</template>
<script>
    export default {
        name: 'page',
        // props: ["total", "gopage"],
        props: {
            total: {
                type: Number
            },
            gopage: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                pageSize: 5,
                nowPage: 1,
                proshow: false,
                nextshow: false,
                showpageList: [],
                gotopage: '',
            }
        },
        computed: {
            pageCount() {
                return Math.ceil(this.total / this.pageSize);
            }
        },
        methods: {
            changepage(id) {
                // if(id === this.nowPage !== 1) return
                this.nowPage = id;
                if(this.pageCount > 7) {
                    let c = [];
                    if(this.nowPage > 4) {
                        this.proshow = true
                        for(let i = this.nowPage - 2 ; i <= this.nowPage + 2; i++) {
                            if(i === this.pageCount) {
                                this.nextshow = false
                                continue
                            } else if(i > this.pageCount) {
                                break
                            }
                            c.push(i);
                        }
                        this.showpageList = c;
                    } else if(this.nowPage <= 4) {
                        this.showpageList = [2, 3, 4, 5];
                    }
                    this.nextshow = this.pageCount - this.nowPage > 3 ? true : false
                    this.proshow = this.nowPage - 5 >= 0 ? true : false
                }
                this.$emit('pagechange', id);
            },
            addpagelist() {
                for(var i = 2; i < this.pageCount; i++) {
                    this.showpageList.push(i);
                }
            },
            gopromorepage() {
                if(this.nowPage <= 5) {
                    this.changepage(1)
                } else {
                     this.changepage(this.nowPage - 5)
                }
            },
            gonextmorepage() {
                if(this.nowPage + 5 > this.pageCount) {
                    this.changepage(this.pageCount)
                } else {
                   this.changepage(this.nowPage + 5)
                }
            },
            gopagesize() {
                if(!this.gotopage) return false;
                this.gotopage = this.gotopage > this.pageCount ? this.gotopage : 1;
                this.changepage(parseInt(this.gotopage, 10));
                //一定要把输入框的值清空，否则会出现错误
                this.gotopage = '';
            }
        },
        created() {
        },
        mounted() {
            this.addpagelist();
            this.$nextTick(()=> {
                this.changepage(1);
            });
        }
    }    
</script>
<style lang="sass" scoped type="text/sass">
    #page
        margin: 0 auto
        .page_item
            min-width: 30px
            border: 1px solid #ddd
            min-height: 30px
            text-align: center
            line-height: 30px
            color: #000
            background-color: fff
            display: inline-block
            margin-right: 10px
            cursor: pointer
            user-select: none
            &.active
                background-color: #20a0ff
                color: #fff
            &.disable
                color: #e4e4e4
                background-color: #fff
                cursor: not-allowed
        .gopage
            width: 30px
            border: 1px solid #ddd
            min-height: 30px
            text-align: center
            line-height: 30px
            color: #000
</style>