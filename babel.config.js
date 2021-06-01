module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
  // rules: [{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }]
}
