const Service = require('egg').Service;

const { SuccessModel, ErrorModel } = require('../models/resModel')

class BgListService extends Service {
  constructor(ctx) {
    super(ctx);
    this.id = ctx.params.id
  }
  async index() {
    const sql = `SELECT * FROM bglist`
    const result = await this.app.mysql.query(sql)
    return result;
  }
  async create(params) {
    const sql = `INSERT INTO bglist (src, type, name) VALUES ('${params.src}', ${params.type}, '${params.name}')`
    const result = await this.app.mysql.query(sql)
    console.log(result);
    return result.insertId;
  }
  async update(params) {
    const { app, ctx } = this
    const row = ctx.helper.delNull({
      id: this.id,
      src: params.src,
      name: params.name,
      type: params.type
    })
    const result = await app.mysql.update('bglist', row);
    if (!result.changedRows && result.affectedRows) {
      return new SuccessModel('暂无更改', '暂无更改')
    }
    if (result.changedRows) {
      return new SuccessModel('修改成功', '修改成功')
    } else {
      return new ErrorModel('修改失败')
    }
  }
  async destroy() {
    const sql = `DELETE FROM bglist WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    console.log(result);
    if (result.affectedRows) {
      return new SuccessModel('删除成功', '删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = BgListService;