/* eslint-disable func-names */
module.exports = function(api) {
  api.cache(true)
  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.js', '.android.js', '.ios.js'],
        alias: {
          '@data': './data',
          '@assets': './assets',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@store': './src/store',
          '@navigation': './src/navigation',
        },
      },
    ],
  ]
  const presets = ['babel-preset-expo']
  return { presets, plugins }
}
