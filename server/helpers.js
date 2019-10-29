/* eslint-disable no-console */

exports.logger = function logger(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    console.log('NEW REQUEST: \n', req);
    console.log('REQUEST BODY: \n', req.body);
  }
  next();
};


exports.sanitizeBody = function sanitizeBody(req, res, next) {
  let { body } = req;
  const sanitizedBody = {};
  Object.keys(body).forEach((key) => {
    const newItem = req.sanitize(body[key]);
    sanitizedBody[key] = newItem;
  });
  body = sanitizedBody;
  console.log('BODY AFTER SANITIZATION: \n', body);
  next();
};
