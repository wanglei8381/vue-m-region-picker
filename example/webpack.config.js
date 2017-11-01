module.exports = {
  entry: './index.js',
  output: {
    path: 'dist',
    filename: 'index.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.styl$/, use: ["vue-style-loader", "css-loader", "stylus-loader"] }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    },
    extensions: ['.js', '.json', '.vue']
  }
}
