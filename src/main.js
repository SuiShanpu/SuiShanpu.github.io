import './styles/index.css'

import dayjs from "dayjs";
import 'dayjs/locale/zh-cn' // 导入dayjs本地化语言

import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let defaultoptions = {treeName:'blocks-tree'}

const app = createApp(App)

dayjs.locale('zh-cn')

app.use(router)
app.use(VueBlocksTree, defaultoptions)

app.mount('#app')
