module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticleListSchema = new Schema({
    date: { type: String, required: true },
    articles: [{
      id: { type: String, required: true },
      postId: { type: String, required: true },
      originalUrl: { type: String, required: true },
      user: {
        id: { type: String, required: true },
        username: { type: String, required: true },
      },
      title: { type: String, required: true },
      likeCount: { type: Number, required: true },
      createdAt: { type: Date , required: true },
    }],
  });
  return mongoose.model('Articles', ArticleListSchema);
};
