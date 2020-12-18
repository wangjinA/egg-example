'use strict';

const Controller = require('egg').Controller;

const createRule = {
  src: 'string',
  type: 'number'
}
const { SuccessModel } = require('../models/resModel')
class BgListController extends Controller {
  // 查询
  async index() {
    const { ctx } = this;
    ctx.body = new SuccessModel(await ctx.service.bgList.index())
  }
  // 创建
  async create() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    ctx.validate(createRule, ctx.request.body);
    const id = await ctx.service.bgList.create(ctx.request.body);
    ctx.body = new SuccessModel({
      id
    })
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    ctx.validate({ id: { type: 'number', required: true } }, ctx.request.body);
    const result = await ctx.service.bgList.update(ctx.request.body);
    ctx.body = result
  }
  // 修改
  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.bgList.destroy();
    ctx.body = result
  }
}

module.exports = BgListController;
