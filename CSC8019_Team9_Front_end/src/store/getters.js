const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  routes: state => state.router.routes,
  addRoutes: state => state.router.addRoutes,
  username: state => state.user.username,
  admin: state => state.user.admin,
  avatar: state => state.user.avatar
};
export default getters;
