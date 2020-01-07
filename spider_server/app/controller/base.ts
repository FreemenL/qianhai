import { Controller } from 'egg';

class BaseController extends Controller {
  async getPager(modName: string, fields?: string[]) {
    const { ctx } = this;
    let { pageNum = 1, pageSize = 5, keywords } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 1 : parseInt(pageSize);
    const query = {};
    if (keywords && fields && fields.length > 0) {
      // tslint:disable-next-line:no-string-literal
      query['$or'] = fields.map(field => ({ [field]: new RegExp(keywords) }));
    }
    try {
      const total = await ctx.model[modName].count(query);
      const result = await ctx.model[modName].find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
      this.success({
        result,
        pageNum,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      });
    } catch (error) {
      this.error(error);
    }
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
      message: 'success',
    };
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      message: error.message,
      data: null,
    };
  }
}

export default BaseController;
