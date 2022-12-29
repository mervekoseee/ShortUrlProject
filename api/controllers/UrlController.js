const Url = require('../models/url.model');

exports.quickCreate = async (req, res) => {
  try {
    let url = await new Url(req.body).save();
    return res.status(201).json({ shortUrl: url.shortUrl });
  } catch (error) {
    console.error('Url oluşturma hatası', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};

exports.createShortUrl = async (req, res) => {
  try {
    let url = await Url.findOne({ longUrl: req.body.longUrl, user: req.user });
    if (url) {
      return res.status(400).json({
        error: 'Bu URL daha önce kısaltıldı!',
      });
    } else {
      url = await new Url({ ...req.body, user: req.user }).save();
      return res.status(201).json(url);
    }
  } catch (error) {
    console.error('Kısa URL oluşturmada hata', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};

exports.redirectToUrl = async (req, res) => {
  try {
    let url = await Url.findOneAndUpdate(
      { shortUrl: req.params.shortUrl },
      { $inc: { clicks: 1 } },
      { new: true, runValidators: true }
    );

    if (!url) {
      return res.status(404).json({ error: 'URL kayıtlı değil!' });
    } else {
      return res.status(200).json({ longUrl: url.longUrl });
    }
  } catch (error) {
    console.error('Yönlendirme hatası', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};

exports.getDashboard = async (req, res) => {
  try {
    let urls = await Url.find({ user: req.user }).sort({ _id: -1 });
    return res.status(200).json(urls);
  } catch (error) {
    console.error('Dashboard hatası', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};

exports.getUrl = async (req, res) => {
  try {
    let url = await Url.findOne({ longUrl: req.query.longUrl, user: req.user });
    if (!url) {
      return res.status(404).json({ error: 'Url bulunamadı!' });
    } else {
      return res.status(200).json(url);
    }
  } catch (error) {
    console.error('url alınırken hata oluştu', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.urlId);
    return res.status(204).send('Silindi');
  } catch (error) {
    console.error('yönlendirme hatası', error);
    return res.status(500).json({ error: 'Sunucu hatası'});
  }
};
