// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  publicPath: "/oiso",
};

// webpack.config.js
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

plugins: [
  new webpack.DefinePlugin({
    VUE_APP_KAKAO_KEY: JSON.stringify(env.VUE_APP_KAKAO_KEY),
    VUE_APP_WEATHER_KEY: JSON.stringify(env.VUE_APP_WEATHER_KEY),
  }),
];
