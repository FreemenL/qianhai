// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/service/articles';

declare module 'egg' {
  interface IService {
    articles: ExportArticles;
  }
}
