import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        proxy: process.env.http_proxy,
      },
    };
  }
  return config;
};
