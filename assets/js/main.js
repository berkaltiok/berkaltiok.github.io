const app = new Vue({
  data() {
    return {
      load: false,
      config: "",
      view: false,
      viewActive: 0
    }
  },
  methods: {
    openItem: function(item, index) {
      window.scrollTo(0,0);
      this.view = item;
    },
    changeActive: function (action) {
      if (action === 'left') {
        if (this.viewActive === 0) return false;
        this.viewActive -= 1
      }
      if (action === 'right') {
        if (this.viewActive+1 === this.view.images.length) return false;
        this.viewActive += 1
      }
    }
  },
  beforeCreate() {
    axios.get('config.json').then(r => {
      this.config = JSON.parse(JSON.stringify(r.data));
    }).then(() => {
      document.title = this.config.site.title;
      $('meta[name="description"]').attr("content", this.config.site.desc);
      $('link[rel="shortcut icon"]').attr("href", this.config.site.favicon);
      this.load = true;
    });
  }
}).$mount('#app');
