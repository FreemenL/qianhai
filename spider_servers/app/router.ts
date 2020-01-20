import { Application } from 'egg';

export default (app: Application) => {

  app.beforeStart(async () => {
    // 保证应用启动监听端口前数据已经准备好了
    // 后续数据的更新由定时任务自动触发
    await app.runSchedule('get_article');
  });

  const { controller, router } = app;
  router.get('/api/weather', controller.weather.index);
  router.get('/api/articles', controller.articles.index);
  router.get('/api/articles/:id', controller.articles.detail);
  router.get('/api/articles/tb/:url', controller.articles.tbDetail);
  router.get('/api/articles/team/:id', controller.articles.tbArticles);
};
