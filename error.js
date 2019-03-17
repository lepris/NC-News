/**
 * This function adds one to its input.
 * @param {number} input any number
 * @returns {number} that number, plus one.
 */

exports.handle200 = (err, req, res, next) => {
  if (err.code === 204) {
    res.status(204).send({ message: err.message });
  } else { next(err); }
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    400: `${err.message}`,
    badlang: `${err.message}`,
    23502: `Supplied POST data is incomplete, please add:  ${err.column}`,
    '22P02': 'Invalid input type, please provide a string',
    42703: 'Column does not exist, please change sort criteria',
  };
  if (codes[err.code]) res.status(400).send({ message: codes[err.code] });
  else { next(err); }
};

exports.handle422 = (err, req, res, next) => {
  const codes = {
    23503: `Please enter valid username ${err.detail}`,
    23505: `This already exists : ${err.detail}`,
  };
  if (codes[err.code]) {
    res.status(422).send({ message: codes[err.code] });
  } else { next(err); }
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send({ message: err.message });
  } else { next(err); }
};


exports.handle500 = (err, req, res, next) => {
  const codes = {
    500: `${err.message}`,
  };
  if (codes[err.code]) res.status(500).send({ message: codes[err.code] });
  else { next(err); }
};
