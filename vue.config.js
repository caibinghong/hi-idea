const path = require('path')
const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/renderer/main.js',
    }
  },
  configureWebpack: {
    // devtool: 'cheap-module-source-map',//生产环境中我们使用
    // devtool: "cheap-module-eval-source-map",//在开发环境中我们使用
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",// 增加该行即可
        '@': path.join(__dirname, './src/renderer'),
      },
      fallback: {
        path: require.resolve("path-browserify")
      }
    },
    externals: {
      'electron': 'require("electron")'
    },
  },
  pluginOptions: {
    electronBuilder: {
      //字体图标找不到问题，要配置
      customFileProtocol: "./",
      //mainProcessFile 指定打包入口文件，注意:package.json 的main:background.js 必须是这样，因为electron:build指定死了
      mainProcessFile: './src/main/index.js',
      nodeIntegration:true,//Module not found: Error: Can't resolve 'fs' 
      builderOptions: {
        "productName": "HiBoss",
        "appId": "com.hip.histron",
        "copyright": "中海创科技（福建）集团有限公司",
        "directories": {
          "output": "dist"
        },
        "nsis": {
          "oneClick": false,
          "allowElevation": true,
          "allowToChangeInstallationDirectory": true,
          "installerIcon": "public/logo.ico",
          "uninstallerIcon": "public/logo.ico",
          "installerHeaderIcon": "public/logo.ico",
          "createDesktopShortcut": true,
          "createStartMenuShortcut": true,
          "shortcutName": "HiBoss",
          "include": "build/script/installer.nsh"//编写安装脚本
        },
        // "files": [
        //   "./dist_electron/**/*",
        //   "./dist_electron/background.js"
        // ],
        "directories": {
          "buildResources": "assets"
        },
        "extraResources": {
          "from": "public/extraResources/",
          "to": "plugs"
        },
        "publish": [{
          "provider": "github",
          "releaseType": "release"
        }],
        // "publish": [
        //   {
        //     "provider": "github", //打包上传到github
        //     "owner": "cbh", //仓库所有者
        //     "repo": "hi-idea", //仓库名称
        //     "private": true, //若是私有仓库，则将私有设置为true，同时添加token，反之不需要设置
        //     "token": "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", //github的私有token
        //     "releaseType": "release" //上传到github的版本类型（draft:草稿，prerelease:提前发行版，release:发行版）
        //   }
        // ],
        "win": {
          "icon": "public/logo.ico",
          "target": [{
            "target": "nsis"
          }]
        }
      }
    }
  }
})