import { getBooktype, getBookList } from '@/service'
const Book = {
    state: {
        booktype: [],
        booklist: [],
        nowchapter: 0,      //当前小说在第几章
        chapterCount: 0,    //當前小說的总章节
    },
    mutations: {
        SET_TYPE: (state, type) => {
            state.booktype = type
        },
        get_book_name: (state, list) => {
            state.booklist = list
        },
        set_chapter: (state, chapter) => {
            state.nowchapter = chapter
        },
        set_chapter_count: (state, chapter_count) => {
            state.chapterCount = chapter_count
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
        },
        SET_NOW_CHAPTER({commit, state}, chapterNum) {
            commit('set_chapter', chapterNum);
            return Promise.resolve(chapterNum)
        },
        SET_CHAPTER_COUNT({commit, state}, chapterCount) {
            commit('set_chapter_count', chapterCount);
            return Promise.resolve(chapterCount);
        }
    }
}

export default Book