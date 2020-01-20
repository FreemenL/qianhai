module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const GeekbangArticleListSchema = new Schema({
    date: { type: String, required: true },
    articles: [{
      id: { type: String, required: true },
      title: { type: String, required: true },
      article_summary: { type: String, required: true },
      author_name: { type: String, required: true },
      publish_time: { type: String, required: true },
      sub_source: { type: String, required: true },
      uuid: { type: String, required: true },
    }],
  });
  return mongoose.model('GeekbangArticles', GeekbangArticleListSchema);
};
