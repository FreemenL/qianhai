import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577633390235_107';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // 配置 mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/spiderData',
    },
  };
  config.customLogger = {
    scheduleLogger: {
      consoleLevel: 'NONE',
    },
  };

  config.dingdingConfig = {
    pushConfig: {
      address: 'https://oapi.dingtalk.com/robot/send?access_token=6f1aee047289aa062ddd04e695a3201e9f17af449d66e3eef6ea8dd5b2713bb2',
      params: {
        method: 'POST',
        contentType: 'json',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          msgtype: 'link',
          link: {
              text: '本周好文推荐',
              title: '前海阅读汇',
              picUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4269213226,2766583204&fm=26&gp=0.jpg',
              messageUrl: 'https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI',
          },
        },
      },
    },
  };
  config.jueJinConfig = {
    apiAddress: {
      list: 'https://web-api.juejin.im/query',
      detail: 'https://post-storage-api-ms.juejin.im/v1/getDetailData?uid=5a25f742f265da430b7b155d&device_id=1575722343014&token=eyJhY2Nlc3NfdG9rZW4iOiJpbktHb1FIU1ExR0lCTXB4IiwicmVmcmVzaF90b2tlbiI6IlFvUm1vSDN3ajNNQW5kcFIiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&type=entryView&postId=',
      detailInformation: ' https://post-storage-api-ms.juejin.im/v1/getDetailData?uid=5a25f742f265da430b7b155d&device_id=1575722343014&token=eyJhY2Nlc3NfdG9rZW4iOiJpbktHb1FIU1ExR0lCTXB4IiwicmVmcmVzaF90b2tlbiI6IlFvUm1vSDN3ajNNQW5kcFIiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&src=web&type=entry&postId=',
    },
    params: {
      list(index) {
        const pageConfig = [ '', '0.0250406435639860016', '0.00722738803557050006', '0.00411696667322030037', '0.00282078451370250003', '0.0019194561979320999', '0.00160635850835430007', '0.00133045078647740008' ];
        return {
          method: 'POST',
          contentType: 'json',
          dataType: 'json',
          headers: {
            'X-Agent': 'Juejin/Web',
            'Content-Type': 'application/json',
          },
          data: {
            operationName: '',
            query: '',
            variables: {
              tags: [ '555e9a77e4b00c57d9955d64' ],
              category: '5562b415e4b00c57d9b94ac8',
              first: 20,
              after: pageConfig[index],
              order: 'POPULAR',
            },
            extensions: {
              query: {
                id: '653b587c5c7c8a00ddf67fc66f989d42',
              },
            },
          },
        };
      },
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
