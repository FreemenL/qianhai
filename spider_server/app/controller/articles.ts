import BaseController from './base';

class ArticleController extends BaseController {
  async index() {
    await this.getPager('Articles', [ 'date' ]);
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
