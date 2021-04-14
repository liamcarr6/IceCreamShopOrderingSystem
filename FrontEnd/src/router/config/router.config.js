import BasicLayout from "../../layout/basic-layout/BasicLayout.vue";
import UserLayout from "@/layout/user-layout/UserLayout";

const constantRoutes = [
  {
    path: "/",
    hidden: true,
    name: "MainPage",
    component: () => import("@/views/main-page/MainPage.vue"),
    meta: {
      title: "Main Page",
    }
  },
  {
    path: "/order",
    hidden: true,
    name: "OrderPage",
    component: () => import("@/views/main-page/MainDelivery.vue"),
    meta: {
      title: "Main Delivery"
    }
  },
  {
    path: "/menu",
    hidden: true,
    name: "MainMenu",
    component: () => import("@/views/main-page/MainMenu.vue"),
    meta: {
      title: "Main Menu"
    }
  },
  {
    path: "/home",
    component: BasicLayout,
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        name: "Home",
        component: () => import("@/views/home/HomePage"),
        meta: {
          icon: "el-icon-s-home",
          title: "Home Page"
        }
      }
    ]
  },
  {
    path: "/order",
    name: "Order",
    redirect: "/order/index",
    component: BasicLayout,
    meta: {
      icon: "el-icon-s-order",
      title: "Order"
    },
    children: [
      {
        path: "/order/index",
        name: "OrderIndex",
        component: () => import("@/views/order/order-index/OrderIndex"),
        meta: {
          icon: "el-icon-s-cooperation",
          title: "Online Order"
        }
      },
      {
        path: "/order/detail",
        name: "OrderDetail",
        component: () => import("@/views/order/order-detail/OrderDetail"),
        meta: {
          icon: "el-icon-tickets",
          title: "Order Chart"
        }
      }
    ]
  },
  {
    path: "/address",
    name: "Address",
    redirect: "/address/index",
    component: BasicLayout,
    meta: {
      icon: "el-icon-s-check",
      title: "Address"
    },
    children: [
      {
        path: "/address/index",
        name: "AddressIndex",
        component: () => import("@/views/address/address-index/AddressIndex"),
        meta: {
          icon: "el-icon-s-promotion",
          title: "Address Add"
        }
      },
      {
        path: "/address/list",
        name: "AddressList",
        component: () => import("@/views/address/address-list/AddressList"),
        meta: {
          icon: "el-icon-s-grid",
          title: "Address List"
        }
      }
    ]
  },
  {
    path: "/private",
    component: UserLayout,
    redirect: "/private/login",
    hidden: true,
    children: [
      {
        path: "/private/login",
        name: "Login",
        meta: {
          title: "Login"
        },
        component: () => import("@/views/private/login/Login")
      }
    ]
  },
  {
    path: "/register",
    hidden: true,
    name: "Register",
    component: () => import("@/views/private/register/Register"),
    meta: {
      title: "Register"
    }
  },
  {
    path: "/404",
    hidden: true,
    meta: {
      title: "Not Found"
    },
    component: () => import("@/views/exception/404.vue")
  },
  {
    path: "/test",
    hidden: true,
    component: () => import("@/Test")
  }
];
const asyncRoutes = [
  {
    path: "/analysis",
    component: BasicLayout,
    redirect: "/analysis/index",
    children: [
      {
        path: "/analysis/index",
        name: "Analysis",
        component: () => import("@/views/analysis/Analysis"),
        meta: {
          title: "analysis",
          icon: "el-icon-s-marketing"
        }
      }
    ]
  },
  {
    path: "/delivery",
    component: BasicLayout,
    redirect: "/delivery/index",
    children: [
      {
        path: "/delivery/index",
        name: "DeliveryIndex",
        component: () => import("@/views/delivery/Delivery"),
        meta: {
          title: "delivery",
          icon: "el-icon-printer"
        }
      }
    ]
  }
]
export { constantRoutes, asyncRoutes };
