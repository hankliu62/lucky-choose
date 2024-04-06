import Antd from 'ant-design-vue';
// import { Button,Layout } from'ant-design-vue';//局部功能使用
import Antd from 'ant-design-vue'; //全局使用

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Antd);  //全局使用
  // nuxtApp.vueApp.use(Button).use(Layout)//局部功能使用
});

