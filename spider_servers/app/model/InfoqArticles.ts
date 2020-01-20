module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const InfoqArticleListSchema = new Schema({
    date: { type: String, required: true },
    articles: [{
      aid: { type: String, required: true },
      title: { type: String, required: true },
      article_summary: { type: String, required: true },
      author_name: { type: String, required: true },
      author_pic: { type: String, required: false },
      comment_count: { type: String, required: true },
      views: { type: String, required: true },
      publish_time: { type: String, required: true },
      topic: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        alias: { type: String, required: true }
      }],
      uuid: { type: String, required: true },
    }],
  });
  return mongoose.model('InfoqArticles', InfoqArticleListSchema);
};
