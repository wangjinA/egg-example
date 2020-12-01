const Service = require('egg').Service;
const { SuccessModel, ErrorModel } = require('../models/resModel');

class datavService extends Service {
  constructor(ctx) {
    super(ctx);
    this.id = ctx.params.id
  }
  async index(isShow = false) {
    let sql = `SELECT * FROM datav`
    isShow && (sql += ` WHERE id=${this.id}`)
    const result = await this.app.mysql.query(sql)
    return result;
  }

  async create(params) {
    const sql = `INSERT INTO datav (preview_img, name, option) VALUES ('${params.previewImg}', '${params.name}', '${params.option}')`
    const result = await this.app.mysql.query(sql)
    // console.log(result);
    return result.insertId;
  }
  async update(params) {
    // const sql = `UPDATE datav set preview_img='${params.preview_img}', name='${params.name}', \`option\`='${option}' WHERE id=${this.id}`
    // const result = await this.app.mysql.query(sql)
    const { app } = this
    const row = app.$utils.delNull({
      id: this.id,
      preview_img: params.preview_img,
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