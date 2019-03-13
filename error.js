exports.handle400 = (err, req, res, next) => {
  const codes = {
    23502: `Supplied POST data is incomplete, MISSING value of ${err.column}`,
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else { next(err); }
};
