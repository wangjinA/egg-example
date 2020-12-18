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
  const config = {
    keys: appInfo.name + '_1605682603171_5995',
    // add your middleware config here
    // 从右往左执行
    middleware: ['errorHandler', 'test'],
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/api',
    },
    multipart: {
      fileSize: '50mb',
      // whitelist: ['.png', '.jpg'], // 白名单，只能使用这里面的文件后缀
      fileExtensions: ['.mp4', '.webm'],
      // mode: 'file'
      mode: 'stream'
    },
    uploadDir: 'app/public/images/datav',
    oss: {
      useAgent: true,
    },
    // 关闭csrf校验
    security: {
      csrf: {
        enable: false
      }
    },
    static: {
      prefix: '/public/',
    },
  };
  return {
    ...config,
  };
};