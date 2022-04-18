'use strict';

const { Service } = require('egg');

class TestService extends Service {
  async getGirl(id) {
    return {
      id,
      name: '小红',
      age: 18,
    };
  }
}

module.exports = TestService;
