const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const FlushCssChunksPlugin = require('flush-css-chunks-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlPlugin = require('style-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = require('./env');
const firebaseConfig = require('./firebase.config');

const isBundleAnalyzer = () => {
  return Boolean(process.env.BUNDLE_ANALYZER);
};

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-loadable',
      'redux-zero',
      'localforage',
      'firebase/app',
      'firebase/auth'
    ]
  },

  output: {
    path: path.resolve('./public'),
    filename: '[name].build.js',
    chunkFilename: '[name].build.js',
    publicPath: '/'
  },

  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      'lodash-es': 'lodash'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'cache-loader', 'babel-loader']
      },
      {
        test: /\.(woff2?|jpe?g|png|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ExtractCssChunksPlugin.extract({ use: [ 'css-loader', {
          loader: 'postcss-loader',
          options: { plugins: [
            require('postcss-simple-vars')(),
            require('postcss-nested')(),
            require('autoprefixer')({
              browsers: [">= 10%", "last 2 versions"]
            }),
            require('css-mqpacker')()
          ]}
        }]})
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env.isDevelopment() ? '"development"' : '"production"',
      'FIREBASE_CONFIG': JSON.stringify(firebaseConfig[env.isProduction() ? 'production' : 'staging'])
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'meta'
    }),

    ...[isBundleAnalyzer() ? () => {} : new webpack.optimize.ModuleConcatenationPlugin()],

    ...[env.isDevelopment() ? () => {} : new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: true,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        unsafe: true
      }
    })],

    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),

    new ExtractCssChunksPlugin({
      filename: '[name].build.css'
    }),
    new FlushCssChunksPlugin(),

    new ScriptExtHtmlPlugin({
      inline: ['meta'],
      defer: ['vendor', 'app'],
      defaultAttribute: 'async'
    }),
    new StyleExtHtmlPlugin(),

    ...[isBundleAnalyzer() ? new BundleAnalyzerPlugin() : () => {}],
  ],

  devtool: env.isDevelopment() ? 'cheap-module-eval-source-map' : 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
      children: false,
      modules: false
    }
  },

  stats: {
    children: isBundleAnalyzer(),
    modules: isBundleAnalyzer()
  }
};
