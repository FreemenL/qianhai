module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-import': {}, // 在@import css文件的时候让webpack监听并编译
    "postcss-url": {},
    'postcss-preset-env': { stage: 0, autoprefixer: { grid: true } },
  }
})