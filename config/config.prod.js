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
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  return {
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
};