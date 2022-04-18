/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123456';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    app: true,
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'test-egg',
    },
  };

  // CSRF enable false
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.session = {
    key: 'BYL_SESS',
    // httpOnly: false,
    maxAge: 60 * 1000,
    renew: true,
  };

  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.ejs = {
    delimiter: '$',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
