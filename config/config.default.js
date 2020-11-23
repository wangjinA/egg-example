/* eslint valid-jsdoc: "off" */

'use strict';
const 公司 = {
  host: '10.44.50.21',
  port: 3306,
}
const 外网 = {
  host: '112.94.13.13',
  port: 29336,
}
// module.exports = {
//   mysql: {
//     user: 'wj_test',
//     password: 'wj_test',
//     database: 'wjtest',
//     ...公司
//   }
// };
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        ...外网,
        // 用户名
        user: 'wj_test',
        // 密码
        password: 'wj_test',
        // 数据库名
        database: 'wjtest',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605682603171_5995';

  // add your middleware config here
  config.middleware = ['errorHandler'];
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  }
  // 文件
  config.multipart = {
    fileSize: '10mb',
    whitelist: ['.png', '.jpg'],
    mode: 'file'
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 关闭csrf校验
  config.security =  {
    csrf: {
      enable: false
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};