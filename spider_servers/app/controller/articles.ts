import BaseController from './base';

class ArticleController extends BaseController {
  async index() {
    await this.getPager('Articles', [ 'date' ]);
  }
  async tbArticles() {
    await this.getPager('TArticles', [ 'date' ]);
  }
  async tbDetail() {
    const { ctx } = this;
    const url = ctx.params.url;
    try {
      const article = await ctx.service.articles.getTbDetail(url);
      this.success(article);
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