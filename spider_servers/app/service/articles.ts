import BaseService from './baseService';
import uniqBy = require('lodash.uniqby');
import cheerio = require('cheerio');

class NewsService extends BaseService {
  articleList: object;
  paramsIndex: number;
  dateString: string;
  constructor(ctx) {
    super(ctx);
    this.paramsIndex = 0;
    this.articleList = {};
    this.dateString = new Date().toLocaleDateString();
  }
  async list() {
    const listData = await this.getModelData('Articles', { date: new RegExp(this.dateString) });
    if (listData.length > 0) {
      const resultlist = uniqBy(listData, 'date');
      return resultlist;
    }
    const { ctx } = this;
    let articles = await this.handleData();
    articles = articles.map(article => ({ ...article, postId: article.originalUrl.split('post/')[1] }));
    try {
      await ctx.model.Articles.create({
        date: this.dateString,
        articles,
      });
    } catch (error) {
      console.log('error', error);
    }
    return articles;
  }
  async getTbDetail(url) {
    const data = await this.fetch(decodeURIComponent(url), null);
    const $ = cheerio.load(data.toString());
    let styleString: string = '';
    Array.from($('style')).forEach(item => {
      styleString += `<style>${$(item).html()}</style>`;
    });
    return {
      styleString,
      content: $('.blog-render-container').html(),
    };
  }
  async handleData() {
    const data = await this.fetchData(this.paramsIndex++);
    const result = data.data.articleFeed.items.edges.map(item => item.node).filter(item => item.likeCount >= 100).sort((a, b) => {
      return b.likeCount - a.likeCount;
    });
    if (!this.articleList[this.dateString]) {
      this.articleList[this.dateString] = [];
    }
    this.articleList[this.dateString].unshift(...result);
    if (this.articleList[this.dateString].length < 10) {
      await this.handleData();
    }
    return this.articleList[this.dateString];
  }
  saveImg(domContent): string[] {
    const imgsUrl: string[] = [];
    const imgRegExp = /\<img\s(.*?)\s*(([^&]>)|(\/\>)|(\<\/img\>))/gi;
    const srcReg = /https:[\'\"]?([^\'\"]*)[\'\"]?/i;
    const matchResult = domContent.match(imgRegExp);
    if (matchResult.length > 0) {
      matchResult.forEach(item => {
        const src = item.match(srcReg);
        imgsUrl.push(src[0]);
      });
    }
    return imgsUrl;
  }
  async getDetailTitle(id) {
    let titleData = {};
    try {
      titleData = await this.fetch(`${this.config.jueJinConfig.apiAddress.detailInformation}${id}`, {});
    } catch (error) {
      console.log(error);
    }
    if (this.ctx.helper.validateBuffer(titleData)) {
      const { screenshot, title } = JSON.parse(titleData.toString()).d;
      return { screenshot, name: title };
    }
    return await this.getDetailTitle(id);
  }
  async aggregationDetail (id) {
    const { name, screenshot } = await this.getDetailTitle(id);
    const content = await this.getDetailContent(id);
    const data = {
      name,
      screenshot,
      content,
    };
    return data;
  }
  async getDetailContent(id) {
    let detailData = {};
    try {
      detailData = await this.fetch(`${this.config.jueJinConfig.apiAddress.detail}${id}`, {});
    } catch (error) {
      console.log(error);
    }
    if (Object.prototype.toString.call(detailData) === '[object Uint8Array]') {
      return JSON.parse(detailData.toString()).d.content;
    }
    return await this.getDetailContent(id);
  }
}

export default NewsService;
