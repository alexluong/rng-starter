const path = require("path")
const webpack = require("webpack")
const dotenv = require("dotenv")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = (_, argv) => {
  // Prepare environment variables
  const env = dotenv.config().parsed
  env.NODE_ENV = argv.mode

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[next] = JSON.stringify(env[next])
    return prev
  }, {})

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: "graphql-tag/loader",
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        "process.env": envKeys,
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html",
      }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
  }
}
