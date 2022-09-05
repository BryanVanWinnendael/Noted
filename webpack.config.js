import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
module.exports = {
  entry: './src/index.tsx',
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css'],
      },
    ],
  },
}