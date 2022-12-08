const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = module.exports = function () {
  return {
    devServer: {
      // static: './dist',
      port: 8080,
      open: '/main.html',
      hot: false,
    },
  };
};

const styles = module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
      ],
    },
  };
};

const postcss = module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});

const pug = function (devMode) {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: devMode,
          },
        },
      ],
    },
  };
};

const images = module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: [/fonts/],
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
      ],
    },
  };
};

const fonts = module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(ttf|woff|woff2|svg|eot)$/,
          exclude: [/images/],
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
      ],
    },
  };
};

const javaScript = module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

const sourceMap = module.exports = function () {
  return {
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
    ],
  };
};

const PAGES_DIR = path.resolve(__dirname, 'src/pages');
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .map((item) => item.replace(/\.[^/.]+$/, ''));
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
}

const devMode = process.env.NODE_ENV === 'development';
const productionMode = !devMode;
const filename = (ext) => (devMode ? `${ext}/[name].${ext}` : `${ext}/[name].[contenthash].${ext}`);
const entryPoints = PAGES.map(page => ({ [page]: `${PAGES_DIR}/${page}/index.js`, }));
const entryPointsCorrect = Object.assign({}, ...entryPoints);

const common = merge([
  {
    entry: entryPointsCorrect,
    output: {
      filename: filename('js'),
      path: PATHS.dist,
      clean: true,
    },

    resolve: {
      alias: {
        '@variables': path.resolve(__dirname, `${PATHS.src}/styles/variables.scss`),
        '@mixins': path.resolve(__dirname, `${PATHS.src}/styles/mixins.scss`),
        'src': path.resolve(__dirname, `${PATHS.src}`),
        'components': path.resolve(__dirname, `${PATHS.src}/components`),
      },
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      ...PAGES.map(
        (page) =>
          new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: `${PAGES_DIR}/${page}/${page}.pug`,
            chunks: [page],
          })
      ),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        'window.$': 'jquery',
      }),
      // new CopyPlugin({
      //   patterns: [{ from: `${PATHS.src}/favicon`, to: 'assets/favicon/' }],
      // }),
    ],
  },
  pug(devMode),
  images(),
  fonts(),
  javaScript(),
]);

module.exports = function () {
  if (productionMode) {
    return merge([
      common,
      postcss(),
    ])
  }
  if (devMode) {
    return merge([
      common,
      styles(),
      devServer(),
      sourceMap(),
    ])
  }
}