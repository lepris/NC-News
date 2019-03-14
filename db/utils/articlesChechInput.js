exports.checkInput = (inputBody) => {
  if (Object.keys(inputBody).toString() === 'title,body,topic,username') {
    const correctInput = {};
    correctInput.author = inputBody.username;
    correctInput.topic = inputBody.topic;
    correctInput.title = inputBody.title;


    if (inputBody.body < 1000) {
      return ({ code: 'bodyTooShort', message: `Currently your article is only characters ${inputBody.body.length}, minimum accepted is 1000` });
    }

    regex = /(\s)(marshmellow)((\s)|([,.]))|(\s)(broccoli)((\s)|([,.]))/gim;
    if (regex.test(inputBody.body)) {
      return ({ code: 'badlang', message: `Please no swearing, this is not allowed :  ${inputBody.body.match(/(\s)(marshmellow)((\s)|([,.]))|(\s)(broccoli)((\s)|([,.]))/gim)}` });
    }

    correctInput.body = inputBody.body;


    return correctInput;
  }

  return null;
};
