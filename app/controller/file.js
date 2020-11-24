'use strict';

//  一文搞懂eggjs中上传文件 https://blog.csdn.net/kuangshp128/article/details/93197919
/**
 * file模式 文件模式；会在本地存储文件
 * 需要在config.multipart = {
 *   mode: file
 * }
 * 获取file  ctx.request.files = [file,...] 
 */

const Controller = require('egg').Controller;

//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 销毁流；翻译：将管道读入一个虫洞；虫洞===消失
const sendToWormhole = require('stream-wormhole');

const fs = require('fs')
const path = require('path');

const targetDir = 'app/public/'
class FileController extends Controller {

  async upload() {
    const { ctx, config } = this;
    // file模式
    if (config.multipart.mode === 'file') {
      ctx.body = await this.fileMode(ctx.request.files)
    } else if (config.multipart.mode === 'stream') { // stream模式
      // ctx.body = await this.streamModel(await ctx.multipart())
      try {
        const stream = await ctx.getFileStream()
        ctx.body = {
          img: await this.singleUpload(stream),
          params: stream.fields
        }
      }catch(err){
        ctx.body = '文件不能为空'
      }
    }
  }
  // file模式下的多图上传
  fileMode(files) {
    return new Promise((resolve, reject) => {
      let speed = 0
      const urls = []
      // 设置url，设置的时候判断是否完成
      const setUrls = (i, val) => {
        urls[i] = val
        if (++speed === files.length) {
          console.log('完成');
          resolve(urls)
        }
      }
      files.forEach((file, index) => {
        const readText = `读取${file.filename}`
        const writeText = `写入${file.filename}`
        console.time(readText)
        fs.readFile(file.filepath, (err, data) => {
          //读取失败，说明没有上传成功
          if (err) {
            console.log('读取失败');
            return setUrls(index, 'error_read_fail')
          }
          console.timeEnd(readText)
          //否则读取成功，开始写入
          // 三个参数
          //1.图片的绝对路径
          //2.写入的内容
          //3.回调函数
          const fileName = file.filename
          console.time(writeText)
          fs.writeFile(path.join(targetDir, fileName), data, (err) => {
            if (err) {
              console.log('写入失败');
              return setUrls(index, 'error_write_fail')
            }
            console.log('写入成功');
            console.timeEnd(writeText)
            return setUrls(index, fileName)
          })
        })
      })
    })
  }
  // stream模式下的多图上传
  async streamModel(parts) {
    return new Promise(async (resolve, reject) => {
      let part // stream流
      const obj = {
        ulrs: [],
        params: {}
      }
      var streamLength = 0
      while ((part = await parts()) != null) {
        if (part.length) {
          // 这是 busboy 的字段
          console.log('field: ' + part[0]);
          console.log('value: ' + part[1]);
          console.log('valueTruncated: ' + part[2]);
          console.log('fieldnameTruncated: ' + part[3]);
          obj.params[part[0]] = part[1]
        } else {
          if (!part.filename) {
            // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
            // 需要做出处理，例如给出错误提示消息
            return;
          }
          streamLength++
          // part 是上传的文件流
          console.log('field: ' + part.fieldname); // field: file
          console.log('filename: ' + part.filename); // filename: 刘德华.png
          console.log('encoding: ' + part.encoding); // encoding: 7bit
          console.log('mime: ' + part.mime); // mime: image / png
          const fileName = part.filename
          const writeStream = fs.createWriteStream(path.join(targetDir + fileName));
          try {
            //异步把文件流 写入
            await awaitWriteStream(part.pipe(writeStream));
            obj.ulrs.push(fileName)
          } catch (err) {
            console.log(err);
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(part);
          } finally {
            setTimeout(() => {
              console.log(streamLength);
              console.log(obj.ulrs.length);
              if (streamLength === obj.ulrs.length) {
                resolve(obj)
              }
            }, 0);
          }
        }
      }
    })
  }

  async singleUpload(stream) {
    console.log(stream);
    const writeStream = fs.createWriteStream(path.join(targetDir + stream.filename));
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      return stream.filename
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      return 'error_write_fail'
    }
  }
}

module.exports = FileController;
