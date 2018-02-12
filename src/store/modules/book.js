import { getBooktype, getBookList } from '@/service'
const Book = {
    state: {
        booktype: [],
        booklist: []
    },
    mutations: {
        SET_TYPE: (state, type) => {
            state.booktype = type
        },
        get_book_name: (state, list) => {
            state.booklist = list
        }
    },
    actions: {
        //获取小说分类
        SET_BOOK_TYPE({ commit, state }) {
            return new Promise((resolve, reject) => {
                getBooktype().then(res => {
                    commit('SET_TYPE', res.data);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //获取小说列表
        Get_BOOK_NAME({ commit, state }) {
            return new Promise((resolve, reject) => {
                getBookList().then(res => {
                    commit('get_book_name', res.data);
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default Book