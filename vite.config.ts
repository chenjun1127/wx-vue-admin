import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: '0.0.0.0',
  //   port: 9020,
  //   proxy: {
  //     // 选项写法
  //     '/api': {
  //       target:'http://183.253.179.151:8081/api/gather',
  //       // target: 'http://www.penyon.cn:8080/api/gather/',
  //       secure: false,
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        /* .scss全局预定义变量，引入多个文件 以;(分号分割)*/
        additionalData: `@import "./src/assets/style/base.scss";`
      }
    }
  },
  build: {
    minify: 'terser', // 必须开启：使用terserOptions才有效果
    terserOptions: {
      // compress: {
      //   //生产环境时移除console
      //   drop_console: true,
      //   drop_debugger: true
      // }
    }
  }
});
