const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const router = new VueRouter({
  mode: 'history',
  base: '/Portfolio/',
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

const app = new Vue({
  router
}).$mount('#app');
