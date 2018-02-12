import { GetBoldTypeList } from '@/service'
const Blog = {
    state: {
        typeList: [],
        typecount: ''
    },
    mutations: {
        SET_TYPE: (state, type) => {
            state.typeList = type
        },
        SET_TYPECOUNT: (state, count) => {
            state.typecount = count
        }
    },
    actions: {
        SetType({ commit, state }, typeInfo) {
            console.info(typeInfo, 889);
            return new Promise((resolve, reject) => {
                GetBoldTypeList().then(res => {
                    commit('SET_TYPE', res.data.list);
                    commit('SET_TYPECOUNT', res.data.count);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

export default Blog