import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
// import cheerio = require('cheerio');

// 获取淘宝前端技术文章
class ZhihuArticlesService extends BaseService {
  dateString: string;
  constructor(ctx) {
    super(ctx);
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const { ctx } = this;
    const articles = await this.getData();
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
    const res  = await this.fetch(this.config.zhihuConfig.apiAddress.list, {});
    let dataList = JSON.parse(res.toString()).data
    return dataList.map( item => ({
      id: item.target.id,
      title: (item.target.question || item.target).title,
      excerpt: item.target.excerpt,
      author_name: item.target.author.name,
      author_pic: item.target.author.avatar_url,
      author_headline: item.target.author.headline,
      comment_count: item.target.comment_count,
      voteup_count: item.target.voteup_count,
      content: item.target.content
    }))
  }
  async detail () {
    let query = {
      'date': this.ctx.query.ts? new Date(+this.ctx.query.ts).toLocaleDateString(): ''
    }
    let resArr = await this.ctx.model['ZhihuArticles'].find(query)
    let match = {}
    resArr.map(item => item.articles.find(article=> {
      if(article.id == this.ctx.params.id){
        return match = article
      }
    }))
    return match
  }
}

export default ZhihuArticlesService;
