<script>
    export default {
        name: 'ffCascaderMenu',
        data() {
            return {
                options: [],
                value: [],
                activeValue: [],
                visible: false,
                menuArr: [],
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    this.activeValue = this.value;
                }
            },
            value: {
                immediate: true,
                handler(value) {
                    this.activeValue = value;
                }
            }
        },
        methods: {
            handleMenuLeave() {
                this.$emit('menuLeave')
            },
            showMenu(arr = this.options) {
                let menu = void 0;
                console.info(arr, 'isarr');
                arr.forEach(v => {
                    if(v.children) {
                        menu += (<li onClick={()=> {this.showMenu(v.children)}}>{v.label}</li>)
                    } else {
                        this.$nextTick(() => {
                            menu +=(<li onClick={()=> {this.suerClick(v.label)}}>{v.label}</li>)
                        })
                    }
                });
                console.info(menu, 'ismenu')
                this.menuArr.push((<ul class="isul">{menu}</ul>))
            },
        },
        render(h) {
            const {options, showMenu, menuArr} = this; 
            console.info(menuArr.length, 'len', options);
            if(!menuArr.length) {showMenu()}
            return(
                <transition name="el-zoom-in-top" on-after-leave={this.handleMenuLeave}>
                    <div class="ff" v-show={this.visible} >
                        {options.label}  12312312
                    </div>
                </transition>
            )
        }
    }
</script>

