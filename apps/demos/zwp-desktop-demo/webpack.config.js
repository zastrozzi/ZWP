// const webpack = require('webpack');

// function getClientEnvironment(configuration) {
//     const NX_APP = "/^NX_/i";

//     const raw = Object.keys(process.env)
//         .filter(key => NX_APP.test(key))
//         .reduce(
//             (env, key) => {
//                 env[key] = process.env[key];
//                 return env;
//             },
//             {
//                 NODE_ENV: process.env.NODE_ENV || configuration,
//             }
//         );

//     const stringified = {
//         'process.env': Object.keys(raw).reduce((env, key) => {
//             env[key] = JSON.stringify(raw[key]);
//             return env;
//         }
//         , {}),
//     };

//     return stringified;
// }

// module.exports = (config, options, context) => {
//     const env = getClientEnvironment(context.configuration);
//     config.plugins.push(new webpack.DefinePlugin(env));
//     return config;
// }