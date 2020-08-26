const  path = require("path")


module.exports = {


    outputDir : path.relative(__dirname , '../back-end/dist') ,
    devServer:{
        proxy:{
            '/api' : {
                target : 'http://localhost:5000'
            }
        }

    }
}
