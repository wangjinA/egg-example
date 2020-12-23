const Service = require('egg').Service;
const { SuccessModel, ErrorModel } = require('../models/resModel');

class datavService extends Service {
  constructor(ctx) {
    super(ctx);
    this.id = ctx.params.id
    this.type = ctx.query.type || 0
  }
  // 查询列表 给id就查单个 isShow查id返回对象 否则返回数组
  async index(id) {
    let _id = this.id || id
    let sql = `SELECT * FROM datav `
    if (_id) {
      sql += `WHERE id=${_id}`
    } else {
      sql += `WHERE type=${this.type}`
    }
    let result
    if (_id) {
      result = (await this.app.mysql.query(sql))[0]
    } else {
      result = await this.app.mysql.query(sql)
    }
    return result
  }

  async create(params) {
    // const sql = `INSERT INTO datav (preview_img, name, option, style) VALUES ('${params.preview_img}', '${params.name}', '${params.option}', '${params.style}')`
    const result = await this.app.mysql.insert('datav', params)
    // console.log(result);
    return result.insertId;
  }
  async update(params) {
    // const sql = `UPDATE datav set preview_img='${params.preview_img}', name='${params.name}', \`option\`='${option}' WHERE id=${this.id}`
    // const result = await this.app.mysql.query(sql)
    const { app, ctx } = this
    const row = ctx.helper.delNull({
      id: this.id,
      preview_img: params.preview_img,
      style: params.style,
      name: params.name,
      option: params.option
    })

    const result = await app.mysql.update('datav', row);
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
    const sql = `DELETE FROM datav WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    // console.log(result);
    if (result.affectedRows) {
      return new SuccessModel('删除成功', '删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = datavService;