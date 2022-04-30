const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/front': {
        target: 'http://edufront.lagounews.com',
        changeOrigin: true
      },
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true
      }
    }
  }
})
