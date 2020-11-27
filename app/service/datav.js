const Service = require('egg').Service;

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
    console.log(result);
    return result.insertId;
  }
  async update(params) {
    const sql = `UPDATE datav set preview_img='${params.previewImg}', name='${params.name}', option='${params.option}' WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    if (!result.changedRows && result.affectedRows) {
      return '暂无更改'
    }
    if (result.changedRows) {
      return '修改成功'
    } else {
      return '修改失败'
    }
  }
  async destroy() {
    const sql = `DELETE FROM datav WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    console.log(result);
    if (result.affectedRows) {
      return '删除成功'
    } else {
      return '删除失败'
    }
  }
}

module.exports = datavService;