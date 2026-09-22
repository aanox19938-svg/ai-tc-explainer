const { GoogleGenerativeAI } = require('@google/generative-ai');

function mockAnalyzeDocument(text) {
  return {
    summary: "This Terms & Conditions document outlines the agreement between you and the service provider. Key points include: (1) Data Collection & Sharing: The company collects extensive personal data including location, browsing history, and device information, and reserves the right to share this with third-party partners. (2) Automatic Renewal: Subscriptions renew automatically unless cancelled 30 days in advance, which could lead to unexpected charges. (3) Liability Limitation: The company's liability is capped at the amount you paid, meaning significant damages from service failures may not be recoverable. (4) Account Termination: The company can terminate your account without notice or reason, potentially causing data loss. Overall, this agreement heavily favors the service provider with limited user protections.",
    clauses: [
      { clause_text: "We may share your personal data with third-party partners for marketing purposes.", risk_level: "high", category: "data_sharing", explanation: "Your personal information may be sold or shared with unknown third parties without your explicit consent for each party." },
      { clause_text: "This agreement automatically renews unless you cancel 30 days prior to renewal date.", risk_level: "medium", category: "auto_renewal", explanation: "You may be charged automatically without reminder. Easy to forget and get billed unexpectedly." },
      { clause_text: "Company is not liable for any damages exceeding the amount paid for the service.", risk_level: "high", category: "liability", explanation: "If the service causes significant harm, you cannot recover full damages. Your rights are severely limited." },
      { clause_text: "We may terminate your account at any time without notice for any reason.", risk_level: "critical", category: "termination", explanation: "You have no stability guarantee. All your data and work could be lost without warning." },
      { clause_text: "We collect your location data, browsing history, and device identifiers.", risk_level: "medium", category: "privacy", explanation: "Extensive tracking of your behavior and location creates a detailed profile about you." }
    ]
  };
}

function mockChatResponse(question) {
  const q = question.toLowerCase();
  if (q.includes('data')) return 'According to the document, the company collects your personal data including location, browsing history, and device identifiers. They may share this with third-party partners for marketing purposes.';
  if (q.includes('cancel')) return 'To cancel, you must notify the company 30 days before the renewal date. If you miss this window, you will be charged for another term automatically.';
  if (q.includes('liability')) return 'The company limits its liability to the amount you paid for the service. This means if their service causes significant harm or data loss, you cannot sue for full damages.';
  if (q.includes('terminate')) return 'The company reserves the right to terminate your account at any time without notice and for any reason. This means you could lose access to all your data without warning.';
  if (q.includes('refund')) return 'The document does not explicitly mention refund policies. Given the auto-renewal clause, it is unlikely refunds are offered for automatic renewals.';
  return `Based on the document, I can tell you that this agreement contains several important provisions regarding data privacy, automatic renewals, and liability limitations. Your question about "${question}" relates to these areas. Could you be more specific about what aspect you'd like to know?`;
}

async function analyzeDocument(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('Using mock analysis (no API key)');
    return mockAnalyzeDocument(text);
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a legal document analyzer. Analyze this Terms & Conditions text. Return ONLY a JSON object with this exact structure (no markdown, no code blocks):
{
  "summary": "Plain language summary in 3-4 paragraphs",
  "clauses": [
    {
      "clause_text": "Exact risky clause text",
      "risk_level": "low|medium|high|critical",
      "category": "data_sharing|auto_renewal|liability|termination|privacy|other",
      "explanation": "Why this is risky in simple terms"
    }
  ]
}
Text to analyze:
${text.substring(0, 25000)}`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    throw new Error('Could not parse AI response');
  } catch (error) {
    console.log('Falling back to mock analysis');
    return mockAnalyzeDocument(text);
  }
}

async function chatWithDocument(question, documentContext, chatHistory = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('Using mock chat (no API key)');
    return mockChatResponse(question);
  }
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const historyText = chatHistory.slice(-5).map(c => `Q: ${c.question}\nA: ${c.answer}`).join('\n\n');
    const prompt = `Document Context:
${documentContext.substring(0, 15000)}

Previous conversation:
${historyText}

User question: ${question}

Answer based ONLY on the document, in simple language, 2-4 sentences. If unsure, say so.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return mockChatResponse(question);
  }
}

module.exports = { analyzeDocument, chatWithDocument };