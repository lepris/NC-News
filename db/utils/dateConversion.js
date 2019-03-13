const moment = require('moment');

function dateConversion(userData) {
  // console.log('|--> UTILS/ DATE CONVERSION');
  const newData = userData.map((x) => {
    x.created_at = moment(x.created_at).format('YYYY-MM-DD');
    return x;
  });
  return newData;
}

function articleRef(data) {
  // console.log('\n|--> UTILS/ articleRef , article id referencing');
  const result = {};
  data.map(article => result[article.title] = article.article_id);
  return result;
}

function commentRefined(refs, array) {
  // console.log('\n|--> UTILS/ commentRefined , comment article id ref');

  const newData = array.map((comment) => {
    comment.article_id = refs[comment.belongs_to];
    comment.author = comment.created_by;
    delete comment.created_by;
    delete comment.belongs_to;
    return comment;
  });
  return newData;
}


module.exports = { dateConversion, articleRef, commentRefined };
