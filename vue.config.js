// const envs = {
//     'development': {
//         GA_ID: 'xxxx123'
//     }
// }

// const env = envs[process.env.NODE_ENV]
// console.log(666, process.env.NODE_ENV, env)


const webpack = require('webpack');
module.exports = {
    devServer: {
        proxy: "http://localhost:3000"
    }
}