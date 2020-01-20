// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/service/articles';
import ExportBaseService from '../../../app/service/baseService';
import ExportTArticles from '../../../app/service/tArticles';
import ExportWeather from '../../../app/service/weather';

declare module 'egg' {
  interface IService {
    articles: ExportArticles;
    baseService: ExportBaseService;
    tArticles: ExportTArticles;
    weather: ExportWeather;
  }
}
