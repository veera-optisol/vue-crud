import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import BaseContainer from './components/UI/BaseContainer.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';
import BaseDialog from './components/UI/BaseDialog.vue';

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App);

app.component('base-container', BaseContainer);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.use(store);
app.use(router);
app.use(VueToast);
app.mount('#app');