import BaseController from './base';

class ArticleController extends BaseController {
  async index() {
    await this.getPager('Articles', [ 'date' ]);
  }
  async tbArticles() {
    await this.getPager('TArticles', [ 'date' ]);
  }
<<<<<<< HEAD
  async tbDetail() {
    const { ctx } = this;
    const url = ctx.params.url;
    try {
      const article = await ctx.service.articles.getTbDetail(url);
      this.success(article);
=======
  async infoqArticles(){
    await this.getPager('InfoqArticles', [ 'date' ]);
  }
  async zhihuArticles(){
    await this.getPager('ZhihuArticles', [ 'date' ]);
  }
  async zhihuArticlesDetails(){
    try {
      let match = await this.ctx.service.zhihuArticles.detail()
      this.success(match);
>>>>>>> 0e2459f1cef742c863c38c4e755b6635ac349ca1
    } catch (error) {
      this.error(error);
    }
  }
  async detail() {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      const article = await ctx.service.articles.aggregationDetail(id);
      this.success(article);
    } catch (error) {
      this.error(error);
    }
  }
}

export default ArticleController;
