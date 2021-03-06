const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        //代理axios
        proxy: {
            // 对api前缀请求到
            '/api': {
                target: 'http://124.222.244.254:8080/',
                // target: 'http://127.0.0.1:8080/',
                changeOrigin: true,
            },
        },
        //vue自己启动的端口
        port: 8081
    }
})