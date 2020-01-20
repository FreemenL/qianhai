import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
// import cheerio = require('cheerio');

// 获取淘宝前端技术文章
class InfoqArticlesService extends BaseService {
  dateString: string;
  constructor(ctx) {
    super(ctx);
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const { ctx } = this;
    const articles = await this.getData();
    const listData = await this.getModelData('InfoqArticles', { date: new RegExp(this.dateString) });
    if (listData.articles && listData.articles.length > 0) {
      const resultlist = uniqBy(listData, 'date');
      return resultlist;
    }
    try {
      await ctx.model.InfoqArticles.create({
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
    let params = {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      headers: {
        'origin': 'https://www.infoq.cn'
      },
      data: {"type":1,"size":12,"id":33}
    };
    const {data}  = await this.fetch(this.config.infoqConfig.apiAddress.list, params);
    // console.log('xxx------', data)
    let res = data.map(item=>({
      aid: item.aid,
      title: item.article_sharetitle,
      article_summary: item.article_summary,
      author_name: item.author[0].nickname,
      author_pic: item.author[0].avatar,
      comment_count: item.comment_count,
      views: item.views,
      publish_time: new Date(item.publish_time).toLocaleString(),
      topic: item.topic
    }))
    // console.log('res', res)
    return res
  }
}

export default InfoqArticlesService;
