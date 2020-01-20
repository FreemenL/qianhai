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
    // let params = {
    //   method: 'POST',
    //   contentType: 'json',
    //   dataType: 'json',
    //   headers: {
    //     // 'X-Agent': 'Juejin/Web',
    //     'Content-Type': 'application/json',
    //   },
    //   data: {"type":1,"size":12,"id":33}
    // };
    // const result: Array<{title: string, auther: string, time: string, pic: string, originalUrl: string, id: string}> = [];
    const res  = await this.ctx.curl(this.config.infoqConfig.apiAddress.list, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      headers: {
        'X-Agent': 'topic/Front-end',
        'Content-Type': 'application/json',
      },
      data: {"type":1,"size":12,"id":33}
    });
    console.log('fetch', fetch)
    console.log('url', this.config.infoqConfig.apiAddress.list)
    console.log('xxx------', res.status, res.data)
    // const $ = cheerio.load(data.toString());
    // const resultTitle = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  h2')).map((item: any) => $(item).text());
    // const resultAuther = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  .card-frontmatter span')).map((item: any) => $(item).text()).filter((_items: any, index) => index % 2 === 0);
    // const resultTime = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card-inner  .card-frontmatter span')).map((item: any) => $(item).text()).filter((_items: any, index) => (index + 1) % 2 === 0).map(_item => _item.split('\n')[1].trim());
    // const resultImg = Array.from($('.auto-content .auto-layout .article-card-wrapper .article-card img')).map((item: any) => $(item).attr('src')).map(_item => _item.startsWith('https') ? _item : `https:${_item}`);
    // const resulturl = Array.from($('.auto-content .auto-layout .article-card-wrapper')).map((item: any) => `${this.config.taobaoConfig.apiAddress.baseurl}${$(item).attr('href')}`);
    // resultTitle.forEach((_item, _index) => {
    //   result[_index] = {
    //     title: _item,
    //     auther: resultAuther[_index],
    //     time: resultTime[_index],
    //     pic: resultImg[_index],
    //     originalUrl: resulturl[_index],
    //     id: resulturl[_index],
    //   };
    // });
    // return result;
    // return res.data
  }
}

export default InfoqArticlesService;
