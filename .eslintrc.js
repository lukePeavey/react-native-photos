module.exports = {
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.android.js', '.ios.js'],
        alias: {
          '@data': './data',
          '@assets': './assets',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@views': './src/views',
        },
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    'react/forbid-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': 'off',
    'operator-linebreak': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'no-else-return': 'off',
    'no-console': 'off', // @FIXME turn this back on later
  },
  globals: {
    fetch: false,
    __DEV__: 'readonly',
  },
}
