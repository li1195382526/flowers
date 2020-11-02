# flowers
taro + dva 的项目

## 搭建示例
- 

## 项目创建
```
// 全局安装taro （cnpm为淘宝镜像）
cnpm install -g @tarojs/cli
// 安装redux
cnpm install --save redux @tarojs/redux @tarojs/redux-h5 redux-thunk redux-logger
//安装dva
cnpm install --save dva-core dva-loading
```

### 克隆到本地后
```
cd flowers
npm install 
npm run dev:weapp

//创建页面
cnpm run tep index
```

### 说明事项

#### 关于异步编程
Taro2.0  版本中使用 async-await 不再需要 @tarojs/async-await。

参考 https://nervjs.github.io/taro/docs/async-await.html

需要重新编译
