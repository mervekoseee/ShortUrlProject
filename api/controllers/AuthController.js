const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: 'Bu e-posta adresi zaten kayıtlı!' });
    } else {
      user = await new User(req.body).save();
      const token = user.createToken();
      return res.status(201).json({ token, email: user.email });
    }
  } catch (error) {
    console.error('Kayıt olma kısmında hata', error);
    return res.status(500).json({ error: 'Sunucu hatası' });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı!' });
    } else {
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const token = user.createToken();
        return res.status(200).json({ token, email: user.email });
      } else {
        return res.status(401).json({ error: 'Şifre eşleşmiyor!' });
      }
    }
  } catch (error) {
    console.error('Giriş kısmında hata!', error);
    return res.status(500).json({ error: 'Sunucu hatası!' });
  }
};
