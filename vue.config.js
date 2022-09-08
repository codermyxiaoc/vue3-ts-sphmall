const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const resolve = (dir) => path.join(__dirname,dir)

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
    .set('views',resolve('./src/views'))
    .set('components',resolve('./src/components'))
    .set('api',resolve('./src/api'))
    .set('hooks',resolve('./src/hooks'))
    .set('interface',resolve('./src/interface'))
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
