import { asyncRoutes } from "@/router/config/router.config";
import BasicLayout from "@/layout/basic-layout/BasicLayout";

/**
 * 入口函数，生成动态路由
 * @param menus
 */
function generateRoutes(menus) {
  let [map, menuIds] = buildMap(menus),
    newRoutes = [];
  newRoutes = doGenerateRoutes(asyncRoutes, menuIds);
  doSortRoutes(newRoutes, map);
  newRoutes = doPatchHeadAndTail(newRoutes);
  return newRoutes;
}

function doPatchHeadAndTail(newRoutes) {
  newRoutes.unshift({
    path: "/",
    name: "Index",
    hidden: true,
    component: BasicLayout,
    redirect: "/home/index"
  });
  newRoutes.push(
    // Not Find
    {
      path: "*",
      redirect: "/404",
      hidden: true
    }
  );
  return newRoutes;
}
/**
 * 过滤路由
 * @param routes  待过滤路由
 * @param menuIds 菜单id集合（过滤器）
 */
function doGenerateRoutes(routes, menuIds) {
  let newRoutes = routes.filter(router => {
    let menuId = router.menuId,
      hidden = router.hidden || router.dev;
    if (menuIds.includes(menuId) || hidden) {
      let children = router.children;
      if (children && children.length > 0) {
        router.children = doGenerateRoutes(children, menuIds);
      }
      return true;
    }
    return false;
  });
  return newRoutes;
}

/**
 * 给路由排序(额外打一些补丁，icon，url等)
 * @param newRoutes  待排序路由
 * @param map        map（权重指示器）
 */
function doSortRoutes(newRoutes, map) {
  newRoutes = newRoutes.sort((preRouter, nextRouter) => {
    doPatchRouter(preRouter, map);
    doPatchRouter(nextRouter, map);
    if (preRouter.children && preRouter.children.length > 0) {
      doSortRoutes(preRouter.children, map);
    }
    if (nextRouter.children && nextRouter.children.length > 0) {
      doSortRoutes(nextRouter.children, map);
    }
    return preRouter.sort - nextRouter.sort;
  });
}

/**
 * 给路由打补丁
 * @param router
 * @param map
 */
function doPatchRouter(router, map) {
  let hidden = router.hidden || router.dev,
    menuId = router.menuId;
  if (!hidden) {
    router.meta.title = map[menuId].menuName;
    router.meta.icon = map[menuId].icon;
    router.path = map[menuId].url;
    router.sort = map[menuId].sort;
  }
}

/**
 *
 * @param menus
 * @returns 过滤器 和 map
 */
function buildMap(menus) {
  let queen = [],
    menuIds = [],
    map = {};
  queen = queen.concat(menus);
  while (queen.length) {
    let first = queen.shift(),
      menuId = first.menuId;
    if (first.children) {
      queen = queen.concat(first.children);
      delete first["children"];
    }
    map[menuId] = first;
    menuIds.push(menuId);
  }
  return [map, menuIds];
}

export default generateRoutes;
