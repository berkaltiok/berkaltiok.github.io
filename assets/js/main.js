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
  router,
  data() {
    return {
      config: {},
      year: new Date().getFullYear()
    }
  },
  beforeCreate() {
    axios.get('config.json').then(r => {
      this.config = JSON.parse(JSON.stringify(r.data));
    });
  }
}).$mount('#app');
