const express = require('express');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
const upload = multer();

app.post('/convert-webp', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image uploaded');

    const webpBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

    res.set('Content-Type', 'image/webp');
    res.send(webpBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
