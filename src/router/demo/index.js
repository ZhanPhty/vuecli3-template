export default [
  {
    path: '/',
    name: 'demohome',
    component: () => import('@/views/About'),
    meta: {
      title: '关于Demo'
    }
  }
]
