'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/upload', controller.file.upload);
  router.resources('banner', '/api/banner', app.controller.banner);

  router.post('/api/useTemplate', controller.datav.useTemplate);
  router.resources('datav', '/api/datav', app.controller.datav);

  router.resources('bgList', '/api/bgList', app.controller.bgList);
};
