module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ZhihuArticleListSchema = new Schema({
    date: { type: String, required: true },
    articles: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      excerpt: { type: String, required: true },
      author_name: { type: String, required: true },
      author_pic: { type: String, required: true },
      author_headline: { type: String, required: true },
      comment_count: { type: String, required: true },
      voteup_count: { type: String, required: true },
      content: { type: String, required: true }
    }],
  });
  return mongoose.model('ZhihuArticles', ZhihuArticleListSchema);
};
