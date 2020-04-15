const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );

const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin( {
        allChunks: true,
        filename: 'style.css'
    } ),
    new OptimizeCssAssetsPlugin( {
        cssProcessor: require( 'cssnano' ),
        cssProcessorPluginOptions: {
            preset: [ 'default', { discardComments: { removeAll: true } } ]
        },
        canPrint: true
    } ),
    new CopyPlugin( [
        { from: './src/styles/sham-ui-datetimepicker.scss', to: 'style.scss' }
    ] )
];

module.exports = {
    entry: {
        index: './src/sham-ui-datetimepicker.sfc',
        style: './src/styles/sham-ui-datetimepicker.scss'
    },
    output: {
        path: __dirname,
        publicPath: '/',
        library: [ 'sham-ui-datetimepicker', 'sham-ui-datetimepicker/index' ],
        libraryTarget: 'umd'
    },
    externals: [
        'sham-ui'
    ],
    plugins: plugins,
    module: {
        rules: [ {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract( {
                fallback: 'style-loader',
                use: 'css-loader!sass-loader'
            } )
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract( {
                fallback: 'style-loader',
                use: 'css-loader'
            } )
        }, {
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /(node_modules)/,
            include: __dirname
        }, {
            test: /\.sht/,
            loader: 'sham-ui-templates-loader?{}'
        }, {
            test: /\.sfc$/,
            use: [
                { loader: 'babel-loader' },
                {
                    loader: 'sham-ui-templates-loader?hot',
                    options: {
                        asModule: false,
                        asSingleFileComponent: true
                    }
                }
            ]
        } ]
    }
};
