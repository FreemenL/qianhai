import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
// import cheerio = require('cheerio');

// 知乎前端文章
class ZhihuArticlesService extends BaseService {
  dateString: string;
  pageIndex: 0;
  constructor(ctx) {
    super(ctx);
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const { ctx } = this;
    const articles = await this.getData();
    if (!articles.length) return;
    const listData = await this.getModelData('ZhihuArticles', { date: new RegExp(this.dateString) });
    if (listData.articles && listData.articles.length > 0) {
      const resultlist = uniqBy(listData, 'date');
      return resultlist;
    }
    try {
      await ctx.model.ZhihuArticles.create({
        date: this.dateString,
        articles,
      });
    } catch (error) {
      console.log('error', error);
    }
    return articles;
  }
  // 获取文章数据
  async getData() {
    const res = await this.fetch(this.config.zhihuConfig.apiAddress.list+'&offset='+ this.pageIndex * 10, {});
    const dataList = JSON.parse(res.toString()).data;
    this.pageIndex++;
    return dataList.map(item => ({
      id: item.target.id,
      title: (item.target.question || item.target).title,
      excerpt: item.target.excerpt,
      author_name: item.target.author.name,
      author_pic: item.target.author.avatar_url,
      author_headline: item.target.author.headline,
      comment_count: item.target.comment_count,
      voteup_count: item.target.voteup_count,
      content: item.target.content,
    }));
  }
  async detail () {
    const query = {
      date: this.ctx.query.ts ? new Date(+this.ctx.query.ts).toLocaleDateString() : '',
    };
    const resArr = await this.ctx.model.ZhihuArticles.find(query);
    let match = {};
    resArr.map(item => item.articles.find(article => {
      if (article.id === this.ctx.params.id) {
        return match = article;
      }
    }));
    return match;
  }
}

export default ZhihuArticlesService;
