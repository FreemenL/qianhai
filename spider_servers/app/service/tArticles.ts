import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
import cheerio = require('cheerio');

// 获取淘宝前端技术文章
class TArticleService extends BaseService {
  dateString: string;
  constructor(ctx) {
    super(ctx);
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const { ctx } = this;
    const articles = await this.getData();
    const listData = await this.getModelData('TArticles', { date: new RegExp(this.dateString) });
    if (listData.articles && listData.articles.length > 0) {
      const resultlist = uniqBy(listData, 'date');
      return resultlist;
    }
    try {
      await ctx.model.TArticles.create({
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
    const result: Array<{title: string, auther: string, time: string, pic: string, originalUrl: string, id: string}> = [];
    const data = await this.fetch(this.config.taobaoConfig.apiAddress.list, null);
    const $ = cheerio.load(data.toString());
    const resultTitle = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  h2')).map((item: any) => $(item).text());
    const resultAuther = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  .card-frontmatter span')).map((item: any) => $(item).text()).filter((_items: any, index) => index % 2 === 0);
    const resultTime = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  .card-frontmatter span')).map((item: any) => $(item).text()).filter((_items: any, index) => (index + 1) % 2 === 0).map(_item => _item.split('\n')[1].trim());
    const resultImg = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card img')).map((item: any) => $(item).attr('src')).map(_item => _item.startsWith('https') ? _item : `https:${_item}`);
    const resulturl = Array.from($('.auto-content .auto-layout .article-card-wrapper')).map((item: any) => `${this.config.taobaoConfig.apiAddress.baseurl}${$(item).attr('href')}`);
    resultTitle.forEach((_item, _index) => {
      result[_index] = {
        title: _item,
        auther: resultAuther[_index],
        time: resultTime[_index],
        pic: resultImg[_index],
        originalUrl: resulturl[_index],
        id: resulturl[_index],
      };
    });
    return result;
  }
}

export default TArticleService;
