const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

app.post('/convert', upload.single('image'), async (req, res) => {
  try {
    const webpBuffer = await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toBuffer();

    res.set('Content-Type', 'image/webp');
    res.send(webpBuffer);
  } catch (err) {
    console.error('Conversion error:', err);
    res.status(500).send('Conversion failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
