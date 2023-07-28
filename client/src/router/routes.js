
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('src/pages/MainPage.vue') },
      { path: '/Cart', component: () => import('src/pages/Cart.vue') },
      { path: '/Login', component: () => import('src/pages/LoginPage.vue') },
      { path: '/Register', component: () => import('src/pages/RegisterPage.vue') },
      { path: '/add-product', component: () => import('src/pages/addProduct.vue') },
      { path: '/product/:id', component: () => import('src/pages/product.vue') },
      { path: '/edit-product', component: () => import('src/pages/editProduct.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
