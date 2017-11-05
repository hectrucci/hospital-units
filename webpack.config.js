const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require ('autoprefixer');
const extractStyles = new ExtractTextPlugin({filename: 'app.css', allChunks: true});

module.exports = options => {
    const config = {
        entry: [
            'bootstrap-loader/extractStyles',
            './client/src/app.js',
        ],
        output: {
            path: __dirname + '/client/build',
            filename: 'app.js',
        },
        devtool: 'source-map',
        resolve: {
            modules: ['node_modules'],
            descriptionFiles: ['package.json'],
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                {
                test: /\.css$/,
                    use: extractStyles.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: extractStyles.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () =>
                                        [
                                            autoprefixer({
                                                browsers: ['Chrome >= 35',
                                                    'Firefox >= 38',
                                                    'Edge >= 12',
                                                    'Explorer >= 10',
                                                    'iOS >= 8',
                                                    'Safari >= 8',
                                                    'Android 2.3',
                                                    'Android >= 4',
                                                    'Opera >= 12'],
                                                cascade: true,
                                                add: true,
                                                remove: true,
                                            }),
                                        ]
                                },
                            },
                            'sass-loader',
                        ],
                    }),
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/font-woff',
                                name: 'fonts/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg|png)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[hash].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            extractStyles,
        ],
    };

    if (process.env.NODE_ENV === 'production') {
        console.log('running webpack in production');
        const buildDir = `${__dirname}/client/build`;
        const cleanDist = new CleanPlugin([buildDir], { verbose: false });

        config.plugins.push(cleanDist);
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            warnings: false,
            mangle: true,
        }));
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        }),);
    } else {
        config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                PORT: JSON.stringify(process.env.PORT || 5000),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }
        }),);
    }

    return config;
}
