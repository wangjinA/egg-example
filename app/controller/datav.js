'use strict';
const { SuccessModel } = require('../models/resModel');

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

  /**
   * @api {get} /api/login 数据查询
   * @apiDescription 用户登录
   * @apiName login
   * @apiGroup User
   * @apiParam {string} userName 用户名
   * @apiParam {string} password 密码
   * @apiSuccess {json} data 数据
   * @apiSuccessExample {json} Success-Response:
   *  {
   *      "status" : 1,
   *      "data" : {
   *          "name" : "loginName",
   *          "password" : "loginPass"
   *      }
   *  }
   * @apiSampleRequest http://localhost:7001/api/datav
   * @apiVersion 1.0.0
   */
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
  // 查询单个
  async show() {
    const { ctx } = this;
    let result = await ctx.service.datav.index(true)
    try {
      result.style = JSON.parse(result.style)
    } catch (error) {
      result.style = {}
    }
    ctx.body = new SuccessModel(result)
  }

  // 创建
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const id = await ctx.service.datav.create(ctx.request.body);
    ctx.body = {
      id,
    };
  }
  // 修改
  async update() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    // console.log(ctx.request.body);
    const result = await ctx.service.datav.update(ctx.request.body);
    ctx.body = result
  }
  // 修改
  async destroy() {
    const ctx = this.ctx;
    const result = await ctx.service.datav.destroy();
    ctx.body = result
  }
}

module.exports = DatavController;
