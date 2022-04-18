'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const counter = app.middleware.counter();
  router.get('/', controller.home.index);
  router.get('/index', counter, controller.test.index);
  router.get('/getFreeQuery', controller.test.getFreeQuery);
  router.get('/getStrictQuery/:name/:age', controller.test.getStrictQuery);
  router.post('/post', controller.test.post);
  router.get('/getGirl', controller.test.getGirl);
  router.get('/cookie', controller.test.cookie);
  router.post('/add', controller.test.add);
  router.post('/del', controller.test.del);
  router.post('/edit', controller.test.edit);
  router.post('/show', controller.test.show);
  router.get('/newContext', controller.test.newContext);
  router.post('/newRequest', controller.test.newRequest);
  router.get('/newResponse', controller.test.newResponse);

  router.get('/addGirl', controller.grilsManage.addGirl);
  router.get('/delGirl', controller.grilsManage.delGirl);
  router.get('/updateGirl', controller.grilsManage.updateGirl);
  router.get('/showGirl', controller.grilsManage.showGirl);
};
