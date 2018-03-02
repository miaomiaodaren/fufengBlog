import { GetBoldTypeList } from '@/service'
import Vue from 'vue'
const Blog = {
    state: {
        typeList: [],
        typecount: ''
    },
    mutations: {
        SET_TYPE: (state, type) => {
            state.typeList = type;
            console.info(type, 32323, state);
        },
        SET_TYPECOUNT: (state, count) => {
            state.typecount = count
        }
    },
    actions: {
        SetType({ commit, state }, typeInfo) {
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