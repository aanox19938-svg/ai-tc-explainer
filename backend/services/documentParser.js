const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(fileBuffer, fileType) {
  try {
    if (fileType === 'pdf') {
      const data = await pdfParse(fileBuffer);
      return data.text;
    } else if (fileType === 'docx') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value;
    }
    throw new Error('Unsupported file type: ' + fileType);
  } catch (error) {
    throw new Error('Failed to extract text from document');
  }
}

module.exports = { extractText };