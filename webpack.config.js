var webpack = require('webpack');

module.exports = [
  {
    entry: './src/jsx/main.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        noParse: [/autoit.js/],
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },
     devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        hot: true,
        inline: false,
        historyApiFallback: false,
        stats: {
            colors: true,
        },
        watchOptions: {
            aggregateTimeout: 250,
            poll: 50
        },
        watch: true,
        noCredentials: true,
        lazy: false, // No watching, compiles on request (cannot be combined with --hot).
        quiet: false, // Display nothing to the console
        noInfo: true, // Display no info to console (only warnings and errors)
    }
  }
];
