'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.file.upload);
  router.resources('banner', '/api/banner', app.controller.banner);
  router.resources('datav', '/api/datav', app.controller.datav);
};
