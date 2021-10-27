/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = { 
  entry: {
    main:path.resolve(__dirname,'../src/main.ts'),
  }, 

  resolve: {
    alias: {
        
    },
    extensions: ['.ts', '.js']
  },




  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',
      chunks:['main'], // 与入口文件对应的模块名
      title: 'output result',
    }),
    new MiniCssExtractPlugin(
      {      
        filename: 'css/[name].[hash:8].css', 
        chunkFilename: '[id].css',   
      }
    ),
    new VueLoaderPlugin()
    // new CleanWebpackPlugin()
  ],

  module:{        
    rules:[
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {   
        test:/\.s[ca]ss$/i,   
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ], // 从右向左解析原则   
        generator: {
          	filename: 'css/[hash][ext][query]'
        	} 
      },
      {        
        test: /\.js$/,  
        exclude: '/node_modules', // 忽略依赖  
        loader: 'babel-loader', 
        options: {        
          presets: ['@babel/preset-env']  
        }      
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // include: path.resolve(__dirname, "../src/assets"),
        type: 'asset/resource'  ,
        generator: {
          	filename: 'static/[hash][ext][query]'
        	}
      },
      {	   
        test: /\.ts$/, 
        use: [{   
          loader: 'ts-loader',  
          options: {  
            appendTsSuffixTo: [/.vue$/]    
          }    
        }]	
      },
      {             
        test: /\.vue$/,  
        use: [                
          'vue-loader'                
        ]            
      }     
    ]    
  },

  // devServer: {    
  //   contentBase: path.resolve(__dirname, '../dist'),
  //   port: 8080,   
  //   publicPath: '/'  
  // }
}
