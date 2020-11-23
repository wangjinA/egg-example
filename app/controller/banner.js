'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  img: 'string'
}

class BannerController extends Controller {
  // 查询
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.banner.index()
  }
  // 创建
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const id = await ctx.service.banner.create(ctx.request.body);
    ctx.body = {
      id,
    };
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const result = await ctx.service.banner.update(ctx.request.body);
    ctx.body = result
  }
  // 修改
  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.banner.destroy();
    ctx.body = result
  }
}

module.exports = BannerController;
