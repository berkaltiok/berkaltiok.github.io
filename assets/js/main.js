const app = new Vue({
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
    openItem: function(item, index) {
      this.pageTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo(0,0);
      this.view = item;
      this.viewActive = 0;
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
    },
    close: function () {
      window.scrollTo(0, this.pageTop);
      this.view = false;
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
  beforeCreate() {
    axios.get('./config.json').then(r => {
      this.config = JSON.parse(JSON.stringify(r.data));
    }).then(() => {
      document.title = this.config.name;
      $('meta[name="description"]').attr("content", this.config.description);
      $('link[rel="shortcut icon"], link[rel="apple-touch-icon"]').attr("href", this.config.icons[0].src);
      this.load = true;
    });
  }
}).$mount('#app');

// PWA Code
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(r => console.log("[SW] Is activated."));
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});