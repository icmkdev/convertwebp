const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const upload = multer();

app.post('/convert', upload.single('image'), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

    res.set('Content-Type', 'image/webp');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion error');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
