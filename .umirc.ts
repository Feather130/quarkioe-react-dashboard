import { defineConfig } from 'umi';

export const DEV_API_SERVER = 'https://xueteng1.quarkioe.com';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {},
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      path: '/',
      component: '@/layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          component: '@/pages/home',
        },
        {
          path: '/dashboard/:id/edit',
          component: '@/pages/dashboardEdit',
        },
        {
          path: '/dashboard/:id/show',
          component: '@/pages/dashboard1',
        },
      ],
    },
  ],
  proxy: {
    '/user': {
      target: DEV_API_SERVER,
      changeOrigin: true,
    },
    '/inventory': {
      target: DEV_API_SERVER,
      changeOrigin: true,
    },
  },
});
