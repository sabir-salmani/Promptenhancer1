import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const enhancePrompt = async (originalPrompt: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert AI image prompt engineer. Your job is to enhance simple image prompts into detailed, professional descriptions that will generate stunning AI images.

Guidelines for enhancement:
- Add specific technical details (camera settings, resolution, lighting)
- Include artistic style references and composition details
- Add quality modifiers (photorealistic, highly detailed, etc.)
- Specify mood, atmosphere, and visual elements
- Keep the core concept intact while making it much more detailed
- Make it optimized for AI image generators like DALL-E, Midjourney, Stable Diffusion
- Aim for 50-100 words in the enhanced version
- Use professional photography and art terminology

Return ONLY the enhanced prompt, no explanations or additional text.`
        },
        {
          role: "user",
          content: `Enhance this image prompt: "${originalPrompt}"`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0]?.message?.content?.trim() || originalPrompt;
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    throw new Error('Failed to enhance prompt. Please try again.');
  }
};