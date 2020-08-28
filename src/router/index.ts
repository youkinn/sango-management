import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: '/home',
    name: '首页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/test',
    redirect: '/test/list',
    name: '测试',
    component: () => import(/* webpackChunkName: "base" */ '@/views/layout.vue'),
    children: [
      {
        path: 'list',
        name: '列表页面',
        meta: {
          breadcrumb: [
            {
              name: '测试'
            }
          ]
        },
        component: () => import(/* webpackChunkName: "test.list" */ '@/views/test/list.vue')
      }
    ]
  },
  {
    path: '/base/dictionary',
    name: '基础信息',
    component: () => import(/* webpackChunkName: "base" */ '@/views/dictionary/index.vue'),
    children: [
      {
        path: 'directory',
        name: '字典目录管理',
        meta: {
          breadcrumb: [
            {
              name: '基本信息'
            }
          ]
        },
        component: () =>
          import(/* webpackChunkName: "directory" */ '@/views/dictionary/dictionary-list.vue')
      },
      {
        path: 'content/:directoryId',
        name: '内容管理',
        meta: {
          breadcrumb: [
            {
              name: '基本信息'
            }
          ]
        },
        component: () =>
          import(
            /* webpackChunkName: "dictionary-content" */ '@/views/dictionary/dictionary-content.vue'
          )
      }
    ]
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import(/* webpackChunkName: "serverError" */ '@/views/error/500.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/error/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
