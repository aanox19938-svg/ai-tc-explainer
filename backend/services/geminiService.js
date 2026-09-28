const { GoogleGenAI } = require('@google/genai');

console.log(
  'Gemini API key loaded:',
  !!process.env.GEMINI_API_KEY
);

// ======================================================
// MOCK DOCUMENT ANALYSIS
// ======================================================

function mockAnalyzeDocument(text) {
  return {
    summary:
      'This Terms & Conditions document outlines the agreement between you and the service provider. Key points include: (1) Data Collection & Sharing: The company collects personal data including location, browsing history, and device information and may share it with third-party partners. (2) Automatic Renewal: Subscriptions may renew automatically unless cancelled 30 days in advance. (3) Liability Limitation: The company limits its liability for certain damages. (4) Account Termination: The company may terminate accounts without notice. Overall, these provisions contain several areas that may require careful attention.',
    clauses: [
      {
        clause_text:
          'We may share your personal data with third-party partners for marketing purposes.',
        risk_level: 'high',
        category: 'data_sharing',
        explanation:
          'Your personal information may be shared with third parties for marketing purposes.'
      },
      {
        clause_text:
          'This agreement automatically renews unless you cancel 30 days prior to renewal date.',
        risk_level: 'medium',
        category: 'auto_renewal',
        explanation:
          'You may be charged automatically if you do not cancel before the required deadline.'
      },
      {
        clause_text:
          'Company is not liable for any damages exceeding the amount paid for the service.',
        risk_level: 'high',
        category: 'liability',
        explanation:
          'The agreement limits the amount of damages that may be recovered from the company.'
      },
      {
        clause_text:
          'We may terminate your account at any time without notice for any reason.',
        risk_level: 'critical',
        category: 'termination',
        explanation:
          'The company may terminate the account without advance notice.'
      },
      {
        clause_text:
          'We collect your location data, browsing history, and device identifiers.',
        risk_level: 'medium',
        category: 'privacy',
        explanation:
          'The document allows collection of several types of personal and device information.'
      }
    ]
  };
}


// ======================================================
// MOCK CHAT RESPONSE
// ======================================================

function mockChatResponse(question) {
  const q = question.toLowerCase().trim();

  if (
    q.includes('biggest risk') ||
    q.includes('main risk') ||
    q.includes('major risk') ||
    q.includes('top risk') ||
    q.includes('risks') ||
    q.includes('danger')
  ) {
    return `Based on the document, I found several important risk areas:

🔴 1. Account Termination
The company may terminate your account at any time without notice or for any reason.

🟠 2. Data Sharing
Personal data may be shared with third-party partners for marketing purposes.

🟠 3. Liability Limitation
The company's liability is limited to the amount paid for the service.

🟡 4. Automatic Renewal
The agreement automatically renews unless cancelled 30 days before the renewal date.

🟡 5. Data Collection
The company collects location data, browsing history, and device identifiers.

I can also show you the exact clause behind each risk.`;
  }

  if (
    q.includes('data') ||
    q.includes('privacy') ||
    q.includes('personal information') ||
    q.includes('tracking') ||
    q.includes('location')
  ) {
    return `The document identifies several privacy-related provisions.

It says the company collects location data, browsing history, and device identifiers. It also states that personal data may be shared with third-party partners for marketing purposes.

Important clauses:

• Data collection:
"We collect your location data, browsing history, and device identifiers."

• Data sharing:
"We may share your personal data with third-party partners for marketing purposes."`;
  }

  if (
    q.includes('cancel') ||
    q.includes('renew') ||
    q.includes('subscription') ||
    q.includes('automatic')
  ) {
    return `The agreement contains an automatic renewal provision.

It states:

"This agreement automatically renews unless you cancel 30 days prior to renewal date."

This means you need to cancel at least 30 days before the renewal date to prevent automatic renewal.`;
  }

  if (
    q.includes('liability') ||
    q.includes('damage') ||
    q.includes('compensation') ||
    q.includes('responsible')
  ) {
    return `The agreement contains a liability limitation.

The relevant clause says:

"Company is not liable for any damages exceeding the amount paid for the service."

In simple terms, the agreement places a limit on the amount of damages that can be recovered from the company.`;
  }

  if (
    q.includes('terminate') ||
    q.includes('termination') ||
    q.includes('account') ||
    q.includes('delete')
  ) {
    return `The document gives the company broad account termination rights.

The relevant clause says:

"We may terminate your account at any time without notice for any reason."

In simple terms, the company says it can terminate the account without advance notice.`;
  }

  if (
    q.includes('refund') ||
    q.includes('money back') ||
    q.includes('money')
  ) {
    return `The provided document information does not explicitly describe a refund policy.

It does contain an automatic-renewal clause stating that the agreement renews unless cancelled 30 days before the renewal date.

The available document information does not specify refund terms.`;
  }

  if (
    q.includes('exact clause') ||
    q.includes('show me the clause') ||
    q.includes('clause') ||
    q.includes('original text')
  ) {
    return `Here are the main clauses identified in the document:

1. Data Sharing:
"We may share your personal data with third-party partners for marketing purposes."

2. Automatic Renewal:
"This agreement automatically renews unless you cancel 30 days prior to renewal date."

3. Liability:
"Company is not liable for any damages exceeding the amount paid for the service."

4. Account Termination:
"We may terminate your account at any time without notice for any reason."

5. Data Collection:
"We collect your location data, browsing history, and device identifiers."`;
  }

  if (
    q.includes('summarize') ||
    q.includes('summary') ||
    q.includes('explain this') ||
    q.includes('what does this document say')
  ) {
    return `In simple terms, the document describes several important conditions you should pay attention to.

The company can collect personal information such as location, browsing history, and device identifiers. It may also share personal data with third-party partners.

The subscription can automatically renew unless cancelled 30 days before the renewal. The agreement also limits the company's liability and allows account termination without notice.

These are the main provisions identified in the available document.`;
  }

  if (
    q.includes('what should i know') ||
    q.includes('what should i look for') ||
    q.includes('important')
  ) {
    return `The main provisions to pay attention to are:

• Data collection and sharing
• Automatic subscription renewal
• Limits on company liability
• Account termination without notice

These provisions affect privacy, payment obligations, potential compensation, and access to the account.`;
  }

  return `I can answer questions about the document's main provisions, including:

• 🔴 Account termination
• 🟠 Data sharing and privacy
• 🟠 Liability limitations
• 🟡 Automatic renewal
• 🟡 Data collection
• 📄 Exact clauses

For example:

"What are the biggest risks in this document?"

"Show me the exact clauses."

"Can the company share my data?"`;
}


// ======================================================
// GEMINI MODEL FALLBACK + RETRY
// ======================================================

async function generateWithFallback(ai, prompt) {
  // Current stable Gemini 3 models.
  const models = [
    'gemini-3.8-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash-lite'
  ];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `Trying Gemini model: ${model} (attempt ${attempt})`
        );

        const response = await ai.models.generateContent({
          model,
          contents: prompt
        });

        const text = response?.text;

        if (!text) {
          throw new Error(`Empty response from ${model}`);
        }

        console.log(
          `Gemini success with model: ${model}`
        );

        return text;

      } catch (error) {
        lastError = error;

        const message =
          error?.message || String(error);

        console.error(
          `Gemini failed with ${model} (attempt ${attempt}):`,
          message
        );

        const temporaryError =
          message.includes('503') ||
          message.includes('UNAVAILABLE') ||
          message.includes('high demand') ||
          message.includes('overloaded') ||
          message.includes('429') ||
          message.includes('RESOURCE_EXHAUSTED');

        // For errors such as invalid API key or invalid model,
        // don't keep retrying every model.
        if (!temporaryError) {
          throw error;
        }

        if (attempt < 2) {
          const delay = attempt * 2000;

          console.log(
            `Temporary Gemini error. Retrying in ${delay}ms...`
          );

          await new Promise(resolve =>
            setTimeout(resolve, delay)
          );
        }
      }
    }

    console.log(
      `Moving to fallback Gemini model after ${model}`
    );
  }

  throw lastError || new Error(
    'All Gemini models failed'
  );
}


// ======================================================
// ANALYZE DOCUMENT
// ======================================================

async function analyzeDocument(text) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log(
      'Using mock analysis (no API key)'
    );

    return mockAnalyzeDocument(text);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey
    });

    const prompt = `You are an AI Terms & Conditions document analyzer.

Analyze the following Terms & Conditions text.

Return ONLY a valid JSON object with this exact structure:

{
  "summary": "Plain language summary in 3-4 paragraphs",
  "clauses": [
    {
      "clause_text": "Exact risky clause text from the document",
      "risk_level": "low|medium|high|critical",
      "category": "data_sharing|auto_renewal|liability|termination|privacy|other",
      "explanation": "Why this clause matters in simple language"
    }
  ]
}

Important:
- Use only information contained in the document.
- Do not invent clauses.
- Keep clause_text as close as possible to the original document.
- Identify important provisions that deserve attention.
- Explain each provision in simple language.
- Return valid JSON only.
- Do not use markdown code fences.

Text to analyze:

${text.substring(0, 25000)}`;

    const responseText =
      await generateWithFallback(
        ai,
        prompt
      );

    const cleanedResponse =
      responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

    const jsonMatch =
      cleanedResponse.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        'Could not find valid JSON in Gemini response'
      );
    }

    const parsed =
      JSON.parse(jsonMatch[0]);

    if (
      !parsed.summary ||
      !Array.isArray(parsed.clauses)
    ) {
      throw new Error(
        'Gemini returned an unexpected response structure'
      );
    }

    return parsed;

  } catch (error) {
    console.error(
      'Gemini analysis failed:',
      error?.message || error
    );

    throw new Error(
      'AI analysis is temporarily unavailable. Please try again.'
    );
  }
}


// ======================================================
// CHAT WITH DOCUMENT
// ======================================================

async function chatWithDocument(
  question,
  documentContext,
  chatHistory = []
) {
  const apiKey =
    process.env.GEMINI_API_KEY;

  if (
    !apiKey ||
    apiKey === 'your_gemini_api_key_here'
  ) {
    console.log(
      'Using mock chat (no API key)'
    );

    return mockChatResponse(question);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey
    });

    const historyText =
      chatHistory
        .slice(-5)
        .map(
          chat =>
            `Q: ${chat.question}\nA: ${chat.answer}`
        )
        .join('\n\n');

    const prompt = `You are an AI assistant that explains Terms & Conditions documents.

Your job is to answer the user's question directly using ONLY the provided document.

DOCUMENT:
${documentContext.substring(0, 20000)}

PREVIOUS CONVERSATION:
${historyText || 'No previous conversation.'}

USER QUESTION:
${question}

Instructions:

1. Answer the user's question directly.
2. Use information from the document.
3. Do not invent facts or clauses.
4. If the question asks about risks, identify important risk areas.
5. If the question asks for a clause, quote the relevant clause when available.
6. Explain difficult legal language in simple terms.
7. If the document does not contain enough information, clearly say that.
8. Do not ask the user to be more specific when the question can reasonably be answered.
9. Keep the response easy to read.
10. Use numbered points or bullet points when discussing multiple risks.
11. Explain why each provision matters.
12. Do not provide a legal conclusion. Explain what the document says.

Give the answer in plain text.`;

    const responseText =
      await generateWithFallback(
        ai,
        prompt
      );

    return responseText;

  } catch (error) {
    console.error(
      'Gemini chat failed. Falling back to mock response:',
      error?.message || error
    );

    return mockChatResponse(question);
  }
}


// ======================================================
// EXPORTS
// ======================================================

module.exports = {
  analyzeDocument,
  chatWithDocument
};