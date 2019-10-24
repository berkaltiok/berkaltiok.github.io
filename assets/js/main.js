const router = new VueRouter({
  mode: 'history',
  // base: '/Portfolio/',
  routes: []
});
const app = new Vue({
  router,
  data() {
    return {
      load: false,
      config: "",
      view: false,
      viewActive: 0,
      pageTop: 0
    }
  },
  methods: {
    openItem: function(item, url = true) {
      this.pageTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo(0,0);
      if (url) this.$router.push({query: {item: this.url(item.title)}});
      this.view = item;
      this.viewActive = 0;
    },
    changeActive: function (action) {
      window.scrollTo(0,0);
      if (action === 'left') {
        if (this.viewActive === 0) return false;
        this.viewActive -= 1
      }
      if (action === 'right') {
        if (this.viewActive+1 === this.view.images.length) return false;
        this.viewActive += 1
      }
    },
    close: function (url = true) {
      window.scrollTo(0, this.pageTop);
      this.view = false;
      if (url) this.$router.push({});
    },
    url: function (string) {
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧıîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
      const p = new RegExp(a.split('').join('|'), 'g');

      return string.toString().toLowerCase().replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    }
  },
  mounted() {
    let that = this;
    $(document).bind('keyup', function(event) {
      if (event.keyCode === 27) that.close();
      if (event.keyCode === 37) that.changeActive('left');
      if (event.keyCode === 39) that.changeActive('right');
    });
  },
  watch: {
    '$route' (to) {
      if (to.fullPath === "/") this.close(false);
      if (to.query.item) {
        let isItem = this.config.portfolio.find(e => this.url(e.title) === to.query.item);
        if (isItem) {
          this.openItem(isItem, false);
        }
      }
    }
  },
  beforeCreate() {
    axios.get('./config.json').then(r => {
      this.config = JSON.parse(JSON.stringify(r.data));
    }).then(() => {
      document.title = this.config.name;
      $('meta[name="description"]').attr("content", this.config.description);
      $('link[rel="shortcut icon"], link[rel="apple-touch-icon"]').attr("href", this.config.icons[0].src);
      if (this.$route.query.item) {
        let isItem = this.config.portfolio.find(e => this.url(e.title) === this.$route.query.item);
        if (isItem) {
          this.openItem(isItem, false);
        }
      }
      this.load = true;
    });
  }
}).$mount('#app');

// PWA Code
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => console.log("[SW] Is activated."));
}