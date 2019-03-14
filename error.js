exports.handle400 = (err, req, res, next) => {
    console.log('\\\\\HANDLE400', err);
    const codes = {
        23502: `Supplied POST data is incomplete, MISSING value of ${err.column}`,
        42703: 'Column does not exist, please change sort criteria',
    };
    if (codes[err.code]) res.status(400).send({ message: codes[err.code] });
    else { next(err); }
};

exports.handle404 = (err, req, res, next) => {
    console.log('\\\\\\\\\\\\\\HANDLE404', err.code);

    if (err.code === 404) {
        console.log('it is getting here!');
        res.status(404).send({ message: err.message });
    } else {
        next(err);
    }
};
