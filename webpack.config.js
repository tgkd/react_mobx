const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getTransformer = require("ts-transform-graphql-tag").getTransformer;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const isDev = argv.mode !== "production";

    return {
        devServer: {
            disableHostCheck: true,
            historyApiFallback: true,
            port: 8001,
        },

        entry: {
            main: ["reflect-metadata", "./src/entry.tsx"],
            vendor: [
                "./src/styles/index.css",
                "./src/styles/reset.css",
            ],
        },

        output: {
            path: path.join(__dirname, "./dist"),
            filename: `[name].[${isDev ? "hash" : "chunkhash"}].js`,
            publicPath: "/",
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "",
                cache: false,
                template: "src/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
        ],

        resolve: {
            extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".less"],
            alias: {
                src: path.join(__dirname, "./src"),
                test: path.join(__dirname, "./test"),
                components: path.join(__dirname, "./src/components"),
                pages: path.join(__dirname, "./src/components/pages"),
                shared: path.join(__dirname, "./src/components/shared"),
                constants: path.join(__dirname, "./src/constants"),
            },
        },

        context: __dirname,

        target: "web",

        devtool: isDev ? "inline-source-map" : "source-map",

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "awesome-typescript-loader",
                            options: {
                                useBabel: true,
                                useCache: true,
                                reportFiles: ["src/**/*.{ts,tsx}"],
                                getCustomTransformers: () => ({
                                    before: [getTransformer()],
                                }),
                            },
                        },
                    ],
                },

                {
                    test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg|otf)$/,
                    use: "url-loader?limit=25000",
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        isDev ? "css-loader?sourceMap" : "css-loader?minimize",
                    ],
                },
            ],
        },
    };
};
