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
  // router.get('/api/articles/team/:id', controller.articles.tbArticles);
  router.get('/api/articles/team/taobao', controller.articles.tbArticles);
  router.get('/api/articles/team/infoq', controller.articles.infoqArticles);
  router.get('/api/articles/team/infoq/:id', controller.articles.infoqArticlesDetails);
  router.get('/api/articles/team/zhihu', controller.articles.zhihuArticles);
  router.get('/api/articles/team/zhihu/:id', controller.articles.zhihuArticlesDetails);
  router.get('/api/articles/team/geekbang', controller.articles.geekbangArticles);
  router.get('/api/articles/team/geekbang/:id', controller.articles.geekbangArticlesDetails);
};
