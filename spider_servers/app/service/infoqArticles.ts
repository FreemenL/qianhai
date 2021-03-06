import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
// import cheerio = require('cheerio');

// 获取淘宝前端技术文章
class InfoqArticlesService extends BaseService {
  dateString: string;
  score: '';
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
      data: {"type":1,"size":10,"id":33, score: this.score}
    };
    const {data = []}  = await this.fetch(this.config.infoqConfig.apiAddress.list, params);
    let res = data.map(item=>({
      aid: item.aid,
      title: item.article_sharetitle,
      article_summary: item.article_summary,
      author_name: item.author[0].nickname,
      author_pic: item.author[0].avatar,
      comment_count: item.comment_count,
      views: item.views,
      publish_time: new Date(item.publish_time).toLocaleString(),
      topic: item.topic,
      uuid: item.uuid
    }))
    this.score = (data[data.length - 1] || '').score || ''
    return res
  }
  async detail () {
    let params = {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      headers: {
        'origin': 'https://www.infoq.cn'
      },
      data: {'uuid': this.ctx.params.id}
    };
    const {data}  = await this.fetch(this.config.infoqConfig.apiAddress.detail, params);
    return data
  }
}

export default InfoqArticlesService;
