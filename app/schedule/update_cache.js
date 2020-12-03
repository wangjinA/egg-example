const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5000', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true // 开始就执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log('定时任务');
    // const res = await this.ctx.curl('http://localhost:7001/api/banner', {
    //   dataType: 'json',
    // });
    // console.log(res.data);
    // this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;
