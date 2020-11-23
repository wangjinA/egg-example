const Service = require('egg').Service;

class bannerService extends Service {
  constructor(ctx) {
    super(ctx);
    this.id = ctx.params.id
  }
  async index() {
    const sql = `SELECT * FROM banner`
    const result = await this.app.mysql.query(sql)
    return result;
  }
  async create(params) {
    const sql = `INSERT INTO banner (name, img) VALUES ('${params.name}', '${params.img}')`
    const result = await this.app.mysql.query(sql)
    console.log(result);
    return result.insertId;
  }
  async update(params) {
    const sql = `UPDATE banner set name='${params.name}',img='${params.img}' WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    if(!result.changedRows && result.affectedRows){
      return '暂无更改'
    }
    if(result.changedRows){
      return '修改成功'
    }else {
      return '修改失败'
    }
  }
  async destroy() {
    const sql = `DELETE FROM banner WHERE id=${this.id}`
    const result = await this.app.mysql.query(sql)
    console.log(result);
    if(result.affectedRows){
      return '删除成功'
    }else {
      return '删除失败'
    }
  }
}

module.exports = bannerService;