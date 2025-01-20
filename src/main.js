import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import pinia from "./plugins/pinia";
import { useMeStore } from "./stores/me";
import "@/scss/style.scss";
import "./plugins/yup"; // Tradução das mensagens de erro do Yup
import "./plugins/axios"; // Configuração do Axios

const app = createApp(App);
app.use(pinia);
const meStore = useMeStore();
meStore.getMe().finally(() => {
  app.use(router).use(vuetify).mount("#app");
});
