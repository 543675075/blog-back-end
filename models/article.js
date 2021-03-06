// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const Schema = mongoose.Schema
const articleSchema = new Schema({
	title: {
		type: String,
		maxlength: 20,
		minlength: 1,
		required: [true, '请填写文章标题']
  },
  tag: {
    type: String,
    required: [true, '请填写文章标签'],
  },
  category: {
    type: String,
    required: [true, '请填写文章分类'],
  },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, '请传递作者']
  },
	content: {
    type: String,
    required: [true, '请填写文章内容']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	cover: {
		type: String,
		default: null
	}
});

// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 4.将集合做为模块成员进行导出
module.exports = {
	Article
}