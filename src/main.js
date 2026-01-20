import './styles/index.css'
import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let defaultoptions = {treeName:'blocks-tree'}

const app = createApp(App)

app.use(router)
app.use(VueBlocksTree, defaultoptions)

app.mount('#app')
