const state = {
  memoryList: []
}

const mutations = {
  ADD_LIST: (state, list) => {
    state.memoryList.push(list)
    console.log(window.performance.memory)
  }
}

const actions = {
  // 普通方法
  addMemoryList({ commit }, list) {
    console.log('addMemoryList')
    commit('ADD_LIST', list)
  }
}
// export default 向外暴露的成员，可以使用任意的变量来接收
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
