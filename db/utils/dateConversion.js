function convertDates(userData) {
  // console.log('|--> UTILS/ DATE CONVERSION');
  const formattedData = userData.map((user) => {
    const newUserData = { ...user };
    newUserData.created_at = new Date(user.created_at);
    return newUserData;
  });
  return formattedData;
}

function articleRef(data) {
  const result = {};
  data.forEach(article => result[article.title] = article.article_id);
  return result;
}

function commentRefined(refs, array) {
  // console.log('\n|--> UTILS/ commentRefined , comment article id ref');

  const newData = array.map((comment) => {
    const newComment = { ...comment };
    newComment.article_id = refs[comment.belongs_to];
    newComment.author = comment.created_by;
    delete newComment.created_by;
    delete newComment.belongs_to;
    return newComment;
  });
  return newData;
}


module.exports = { convertDates, articleRef, commentRefined };
