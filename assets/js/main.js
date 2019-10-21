const app = new Vue({
  data() {
    return {
      load: false,
      config: "",
      view: false
    }
  },
  methods: {
    openItem: function(item, index) {
      this.view = index.toString();
      console.log(item, index)
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
