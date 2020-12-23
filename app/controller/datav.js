'use strict';
const { SuccessModel, ErrorModel } = require('../models/resModel');
const datavModel = require('../models/datavModule')
const Controller = require('egg').Controller;

const createRule = {
  name: {
    type: 'string',
    required: false,
  },
  preview_img: {
    type: 'string',
    required: false,
  },
  option: {
    type: 'string',
    required: false,
  }
}

class DatavController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.id = ctx.params.id
  }

  // 查询
  async index() {
    const { ctx } = this;
    let result = await ctx.service.datav.index()
    result.forEach(item => {
      delete item.option
      delete item.style
    });
    ctx.body = new SuccessModel(result)
  }
  // 查询单个 判断id
  async show() {
    const { ctx } = this;
    let result = await ctx.service.datav.index()
    try {
      result.style = JSON.parse(result.style)
      ctx.body = new SuccessModel(result)
    } catch (error) {
      ctx.body = new ErrorModel('数据不存在')
    }
  }

  // 创建
  async create() {

    const ctx = this.ctx;
    let style = JSON.stringify({
      ...datavModel.style,
      ...ctx.request.body.style
    })
    const data = { ...datavModel, ...ctx.request.body, style }
    const id = await ctx.service.datav.create(data);
    ctx.body = new SuccessModel({
      id,
    });
  }

  // 修改
  async update() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    // console.log(ctx.request.body);
    const result = await ctx.service.datav.update(ctx.request.body);
    ctx.body = result
  }

  // 删除
  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.datav.destroy();
    ctx.body = result
  }

  // 使用模板
  async useTemplate() {
    const { ctx } = this
    const { body } = ctx.request
    let result = await ctx.service.datav.index(body.id)
    if (!result) {
      ctx.body = new ErrorModel('模板为空')
    } else {
      const id = await ctx.service.datav.create({
        name: body.name || result.name + ' - 拷贝',
        preview_img: result.preview_img,
        style: result.style,
        option: result.option,
      });
      ctx.body = new SuccessModel({
        id,
      });
    }
  }
}

module.exports = DatavController;
