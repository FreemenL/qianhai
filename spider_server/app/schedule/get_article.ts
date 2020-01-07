import { Subscription } from 'egg';

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // cron: '0 30 2 * * 1', // 每周一的2点30分0秒更新
      interval: '1h', // 每小时执行一次
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }
  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { service } = this.ctx;
    service.articles.list();
    service.articles.fetchDingDing();
  }
}

export default UpdateCache;
