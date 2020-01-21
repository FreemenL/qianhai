import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');

class GeekbangArticlesService extends BaseService {
  dateString: string;
  pageIndex: 1;
  constructor(ctx) {
    super(ctx);
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const { ctx } = this;
    const articles = await this.getData();
    const listData = await this.getModelData('GeekbangArticles', { date: new RegExp(this.dateString) });
    if (listData.articles && listData.articles.length > 0) {
      const resultlist = uniqBy(listData, 'date');
      return resultlist;
    }
    try {
      await ctx.model.GeekbangArticles.create({
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
        'origin': 'https://s.geekbang.org'
      },
      data: {"q":"node.js","t":2,"s":10,"p":this.pageIndex}
    };
    const {data}  = await this.fetch(this.config.geekbangConfig.apiAddress.list, params);
    this.pageIndex ++
    let res = data.list.map(item=>{
      let uuid = item.content_url.split('https://www.infoq.cn/article/')[1] || item.content_url.split('https://www.infoq.cn/articles/')[1]
      return {
      id: item.id,
      title: item.title,
      article_summary: item.summary,
      author_name: item.author,
      publish_time: new Date(+item.release_time * 1000).toLocaleString(),
      sub_source: item.sub_source,
      uuid: uuid
    }})
    return res
  }
  async detail () {
    let params = {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      headers: {
        'origin': 'https://s.geekbang.org'
      },
      data: {'uuid': this.ctx.params.id}
    };
    const {data}  = await this.fetch(this.config.geekbangConfig.apiAddress.detail, params);
    return data
  }
}

export default GeekbangArticlesService;
