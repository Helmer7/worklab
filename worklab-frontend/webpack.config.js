const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      querystring: require.resolve('querystring-es3'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
