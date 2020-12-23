/*
 * @Author: 汪锦
 * @Date: 2020-12-23 09:55:58
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-23 14:56:54
 * @Description: datav项目的数据模型
 */


module.exports = {
  name: '大屏可视化', // 项目名称
  preview_img: '', // 项目预览图
  style: { // 项目属性设置
    x: 60,
    y: 60,
    w: 1920,
    h: 1080,
    scale: 0.7,
    backgroundImage: '', // 背景图
    backgroundColor: 'rgba(34, 36, 43,1)', // 背景颜色
    bgType: 1, // 背景类型 0 图片 1 颜色
  },
  option: JSON.stringify([]) // 组件配置列表
}