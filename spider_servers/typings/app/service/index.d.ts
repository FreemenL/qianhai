// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticles from '../../../app/service/articles';
import ExportBaseService from '../../../app/service/baseService';
import ExportGeekbangArticles from '../../../app/service/geekbangArticles';
import ExportInfoqArticles from '../../../app/service/infoqArticles';
import ExportTArticles from '../../../app/service/tArticles';
import ExportWeather from '../../../app/service/weather';
import ExportZhihuArticles from '../../../app/service/zhihuArticles';

declare module 'egg' {
  interface IService {
    articles: ExportArticles;
    baseService: ExportBaseService;
    geekbangArticles: ExportGeekbangArticles;
    infoqArticles: ExportInfoqArticles;
    tArticles: ExportTArticles;
    weather: ExportWeather;
    zhihuArticles: ExportZhihuArticles;
  }
}
