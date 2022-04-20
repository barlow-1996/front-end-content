/* eslint-disable import/no-anonymous-default-export */
import Login from "../pages/Login";

import Dashboard from "../pages/Admin/Dashboard";

import Edit from "../pages/Admin/Products/Edit";
import List from "../pages/Admin/Products/List";

import PageNotFound from "../pages/PageNotFound";

export const mainRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/404',
    component: PageNotFound
  }
]
export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    title: '看板',
    isShow: true,
    icon: 'AreaChartOutlined'
  },
  {
    path: '/admin/products',
    component: List,
    exact: true,
    title: '商品管理',
    isShow: true,
    icon: 'ShopOutlined'
  },
  {
    path: '/admin/products/edit/:id?',
    component: Edit,
    isShow: false
  }
]