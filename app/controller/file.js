'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path')
class FileController extends Controller {
  async upload() {
    const { ctx } = this;
    console.log(1);
    console.log(ctx.request.file);
    console.log(2);
    console.log(ctx.request.files);
    console.log(ctx.request);
    const file = ctx.request.files[0];
    const name = 'egg-multipart-test/' + path.basename(file.filename);
    let result;
    try {
      // process file or upload to cloud storage
      result = await ctx.oss.put(name, file.filepath);
    } finally {
      // remove tmp files and don't block the request's response
      // cleanupRequestFiles won't throw error even remove file io error happen
      ctx.cleanupRequestFiles();
      // remove tmp files before send response
      // await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      url: result.url,
      // get all field values
      requestBody: ctx.request.body,
    };
  }
}

module.exports = FileController;
