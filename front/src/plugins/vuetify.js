import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#000',
        secondary: '#004A62',
        accent: '#000',
        background:"#fff",
        error:"#f54545"
        
      },
      dark: {
        primary: '#fff', 
        secondary: '#498da3', 
        accent: '#fff',
        background:"#000",
        error:"#f54545"
        
      },
    },
  },
});
