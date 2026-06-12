import * as pdfjsLib from 'pdfjs-dist';

// 设置 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// PDF 解析服务
export const pdfService = {
  // 解析 PDF 文件为文本
  async extractTextFromPDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ');
        
        fullText += pageText + '\n\n';
      }
      
      return fullText;
    } catch (error) {
      console.error('PDF 解析失败:', error);
      throw new Error('PDF 解析失败，请检查文件是否正确');
    }
  },

  // 简单地从文本中提取结构化信息（基本实现）
  extractResumeData(text) {
    // 这里是一个简单的提取示例，实际项目中可以使用 AI 来解析
    return {
      rawText: text,
      // 可以后续扩展：使用 AI 或正则从 rawText 中提取结构化数据
    };
  }
};
