

const path=require("path");

const webpack=require("webpack");

const HtmlWebpackPlugin=require("html-webpack-plugin");

const openBrowserWebpackPugin=require("open-browser-webpack-plugin");

const extractTextWebpackPlugin=require("extract-text-webpack-plugin");

module.exports={
    entry:["./src/index.js"],
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"js/[name].[hash:8].js",
        publicPath:"/"
    },
    devtool:"source-map",
    resolve:{
        alias:{   //别名 
            "vue":"vue/dist/vue.js"
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:[
                     "babel-loader"
                ]
            },
            {
                test:/\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                use:["url-loader?limit=8192&name=font/[hash:8].[name].[ext]"]

            },
            {
                test:/\.(css|less)$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:"style-loader",  // 转为node 风格代码
                    use:['css-loader',      // 变成 模块
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),   // 美化css 代码
                                        require("postcss-px2rem")({remUnit:100}), // px 转 rem 
                                        require("autoprefixer")()  // 自动补全 
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]

                })
            },
            {
                test:/\.(css|scss)$/,
                use:extractTextWebpackPlugin.extract({
                    fallback:"style-loader",  // 转为node 风格代码
                    use:['css-loader',      // 变成 模块
                        {
                            loader:"postcss-loader",
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),   // 美化css 代码
                                        require("postcss-px2rem-exclude")({
                                            remUnit:100,
                                            exclude:/mint-ui/i
                                            }), // px 转 rem 
                                        require("autoprefixer")()  // 自动补全 
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]

                })
            },
            {
                test:/\.vue$/,
                loader:"vue-loader",
                options:{
                    loaders:[
                        {'css':"style-loader!css-loader"},
                        {"less":"style-loader!css-loader!less-loader"},
                        {"scss":"style-loader!css-loader!sass-loader"}
                    ],
                    postcss:function(){
                        return [
                            require("postcss-px2rem-exclude")({
                                remUnit:100,
                                exclude:/mint-ui/i
                            })
                        ]
                    }
                }
            }
    


        ]
    },
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        compress:true,
        // open:true,
        host:"localhost",
        port:7000,//默认8080
        publicPath:"",
        historyApiFallback:true,
        disableHostCheck:true,
    },
    plugins:[
        new openBrowserWebpackPugin({
            url:"http://localhost:7000"
        }),
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            inject:true
        }),
        new extractTextWebpackPlugin({
            filename:"app.[hash:8].css",
            allChunks:true,   // 获取全部数据
            disable:false     
        }),

        new webpack.HotModuleReplacementPlugin()
    ]

};