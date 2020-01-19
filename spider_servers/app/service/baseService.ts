import { Service } from 'egg';
import url = require('url');

class BaseService extends Service {
  // 获取掘金文章列表数据
  async fetchData(index) {
    const { jueJinConfig } = this.config;
    const { data } = await this.ctx.curl(jueJinConfig.apiAddress.list, jueJinConfig.params.list(index));
    return data;
  }
  // 发送钉钉消息
  async fetchDingDing(params = {}) {
    const { dingdingConfig } = this.config;
    let data;
    try {
      const res = await this.ctx.curl(dingdingConfig.pushConfig.address, Object.assign(params, dingdingConfig.pushConfig.params));
      data = res.data;
    } catch (error) {
      console.log('error', error);
    }
    return data;
  }
  async fetch(uri, params) {
    const { data } = await this.ctx.curl(url.format(uri), params);
    return data;
  }
  async getModelData(moduleName, query) {
    const { ctx } = this;
    return await ctx.model[moduleName].find(query);
  }
}

export default BaseService;
