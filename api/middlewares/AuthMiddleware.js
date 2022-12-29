const jwt = require('jsonwebtoken');

//yolları korumak için
exports.isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Kullanıcı yetkili değil!' });
  }
  let token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'Erişim reddedildi' });
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = payload._id;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ error: 'Oturum zaman aşımına uğradı, lütfen tekrar giriş yapın' });
      } else if (error.name === 'JsonWebTokenError') {
        return res
          .status(401)
          .json({ error: 'Lütfen tekrar giriş yapın' });
      } else {
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  }
};
