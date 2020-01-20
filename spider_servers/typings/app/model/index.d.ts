// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportInfoqArticles from '../../../app/model/InfoqArticles';
import ExportArticles from '../../../app/model/articles';
import ExportTArticles from '../../../app/model/tArticles';
import ExportZhihuArticles from '../../../app/model/zhihuArticles';

declare module 'egg' {
  interface IModel {
    InfoqArticles: ReturnType<typeof ExportInfoqArticles>;
    Articles: ReturnType<typeof ExportArticles>;
    TArticles: ReturnType<typeof ExportTArticles>;
    ZhihuArticles: ReturnType<typeof ExportZhihuArticles>;
  }
}
