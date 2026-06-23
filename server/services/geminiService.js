const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCode = async (code, language) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    You are an expert Senior Software Engineer and Code Reviewer.

    Analyze the following ${language} code and return your response in JSON format:

    {
      "summary": "",
      "bugs": [],
      "securityIssues": [],
      "performanceImprovements": [],
      "cleanCodeSuggestions": [],
      "optimizedCode": "",
      "difficulty": "",
      "bestPractices": []
    }

    Code:
    ${code}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Extract JSON from the response text (it might be wrapped in markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  throw new Error('Failed to parse AI response');
};

module.exports = { analyzeCode };
