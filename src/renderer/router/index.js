import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/',
          name: 'landing-page',
          component: require('@/components/LandingPage').default
      },
      {
          path: '/login',
          name: 'login-page',
          component: require('@/components/Login').default
      }, {
          path: '/admin',
          name: 'admin-page',
          component: require('@/components/Admin').default,
          children: [
              {
                  path: '/admin/home',
                  name: 'home-page',
                  component: require('@/components/Admin/Home').default
              },

              {
                  path: '/admin/orders',
                  name: 'orders-page',
                  component: require('@/components/Admin/Orders').default
              },

              {
                  path: '/admin/clients',
                  name: 'clients-page',
                  component: require('@/components/Admin/Clients').default
              },

              {
                  path: '/admin/products',
                  name: 'products-page',
                  component: require('@/components/Admin/Products').default
              },

              {
                  path: '/admin/reports',
                  name: 'reports-page',
                  component: require('@/components/Admin/Reports').default
              },

              {
                  path: '/admin/settings',
                  name: 'settings-page',
                  component: require('@/components/Admin/Settings').default
              },
          ]
      },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
