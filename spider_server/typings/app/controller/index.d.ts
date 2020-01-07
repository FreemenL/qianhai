// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/controller/articles';
import ExportBase from '../../../app/controller/base';

declare module 'egg' {
  interface IController {
    articles: ExportArticles;
    base: ExportBase;
  }
}
