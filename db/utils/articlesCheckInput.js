exports.checkInput = (inputBody) => {
  const aOfKeys = Object.keys(inputBody).toString();
  if (aOfKeys.includes('title') && aOfKeys.includes('body') && aOfKeys.includes('topic') && aOfKeys.includes('body')) {
    const correctInput = {};
    correctInput.author = inputBody.username;
    correctInput.topic = inputBody.topic;
    correctInput.title = inputBody.title;
    correctInput.body = inputBody.body;

    if (inputBody.body < 1000) {
      return ({ code: 'bodyTooShort', message: `Currently your article is only characters ${inputBody.body.length}, minimum accepted is 1000` });
    }

    const regex = /(\s)(marshmellow)((\s)|([,.]))|(\s)(broccoli)((\s)|([,.]))/gim;
    if (regex.test(inputBody.body)) {
      return ({ code: 'badlang', message: `Please no swearing, this is not allowed :  ${inputBody.body.match(/(\s)(marshmellow)((\s)|([,.]))|(\s)(broccoli)((\s)|([,.]))/gim)}` });
    }
    return correctInput;
  }

  return null;
};
