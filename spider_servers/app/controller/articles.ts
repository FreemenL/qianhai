import BaseController from './base';

class ArticleController extends BaseController {
  async index() {
    await this.getPager('Articles', [ 'date' ]);
  }
  async tbArticles(){
    await this.getPager('TArticles', [ 'date' ]);
  }
  async infoqArticles(){
    await this.getPager('InfoqArticles', [ 'date' ]);
  }
  async infoqArticlesDetails(){
    try {
      let match = await this.ctx.service.infoqArticles.detail()
      this.success(match);
    } catch (error) {
      this.error(error);
    }
  }
  async zhihuArticles(){
    await this.getPager('ZhihuArticles', [ 'date' ]);
  }
  async zhihuArticlesDetails(){
    try {
      let match = await this.ctx.service.zhihuArticles.detail()
      this.success(match);
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
