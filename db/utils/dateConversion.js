exports.convertDates = (userData) => {
  const formattedData = userData.map((user) => {
    const newUserData = { ...user };
    newUserData.created_at = new Date(user.created_at);
    return newUserData;
  });
  return formattedData;
};
exports.articleRef = (data) => {
  const result = {};
  data.forEach(article => result[article.title] = article.article_id);
  return result;
};

exports.commentRefined = (refs, array) => {
  const newData = array.map((comment) => {
    const newComment = { ...comment };
    newComment.article_id = refs[comment.belongs_to];
    newComment.author = comment.created_by;
    delete newComment.created_by;
    delete newComment.belongs_to;
    return newComment;
  });
  return newData;
};
