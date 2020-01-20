module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const InfoqArticleListSchema = new Schema({
    date: { type: String, required: true },
    articles: [{
      // aid: { type: String, required: true }
    }],
  });
  return mongoose.model('InfoqArticles', InfoqArticleListSchema);
};
