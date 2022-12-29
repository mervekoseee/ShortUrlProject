const Joi = require('joi');

exports.validateUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  let { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    return next();
  }
};

exports.validateUrl = (req, res, next) => {
  const schema = Joi.object({
    longUrl: Joi.string()
      .required()
      .custom((value, helper) => {
        let urlPattern = new RegExp(
          '^(https?:\\/\\/)?' + // protokol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain adı
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ip adı
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
          'i'
        ); // fragment locator

        if (!urlPattern.test(value)) {
          helper.message = 'Lütfen geçerli bir URL girin!';
        } else {
          return true;
        }
      }),
  });

  let { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    return next();
  }
};
