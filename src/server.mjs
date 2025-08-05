import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { extractInvoiceData } from './parser.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Invoice Extractor API is running!');
});

app.post('/extract', upload.single('pdf'), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const extracted = extractInvoiceData(data.text);
    res.json({ success: true, data: extracted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
