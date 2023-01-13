
module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: __dirname,
        filename: "./public/js/bundle.js"
    },
    module: {
        rules: [
            // 編譯 css 檔案設定
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    }
};