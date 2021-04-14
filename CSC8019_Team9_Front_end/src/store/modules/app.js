const app = {
  state: {
    sidebar: false,
    size: undefined //xs, sm, md, lg, xl
  },
  actions: {},
  mutations: {
    SET_SIDEBAR: state => {
      state.sidebar = !state.sidebar;
    },
    SET_SIZE: (state, value) => {
      state.size = value;
    }
  }
};
export default app;
