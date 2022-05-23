const path = require("path");
const entryPath = "";
 
module.exports = {

  entry: "./js/app.js",

  output: {

    filename: "out.js",

    path: path.resolve(__dirname, `${entryPath}/build1`)

  },
  
  devServer: {

    contentBase: path.join(__dirname, `${entryPath}`),

    publicPath: "build2",

    compress: true,

    port: 3001

  },

  mode: "development"

 

}, 

{

    module: {
  
      rules: [
  
        {
  
          test: /\.js$/,
  
          exclude: /node_modules/,
  
          loader: "babel-loader"
  
        }
  
      ]
  
    }
  
  }




