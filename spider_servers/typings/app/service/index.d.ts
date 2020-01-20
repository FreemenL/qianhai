// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/service/articles';
import ExportBaseService from '../../../app/service/baseService';
import ExportInfoqArticles from '../../../app/service/infoqArticles';
import ExportTArticles from '../../../app/service/tArticles';
import ExportZhihuArticles from '../../../app/service/zhihuArticles';

declare module 'egg' {
  interface IService {
    articles: ExportArticles;
    baseService: ExportBaseService;
    infoqArticles: ExportInfoqArticles;
    tArticles: ExportTArticles;
    zhihuArticles: ExportZhihuArticles;
  }
}
