var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Bem.js',
    output: {
        path: path.resolve('dist'),
        filename: 'Bem.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    externals: ['react', 'react-dom']
}
