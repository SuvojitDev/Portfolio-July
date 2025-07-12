const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // opens report.html
            openAnalyzer: true,
            reportFilename: 'bundle-report.html'
        })
    ]
};
