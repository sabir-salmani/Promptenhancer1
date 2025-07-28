import React, { useState } from 'react';
import { Sparkles, Copy, ArrowRight, Wand2 } from 'lucide-react';
import { enhancePrompt as enhancePromptAPI } from './services/openai';

function App() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copied, setCopied] = useState(false);

  const enhancePrompt = async () => {
    if (!inputPrompt.trim()) return;
    
    setIsEnhancing(true);
    
    try {
      const enhanced = await enhancePromptAPI(inputPrompt);
      setEnhancedPrompt(enhanced);
    } catch (error) {
      console.error('Enhancement failed:', error);
      setEnhancedPrompt('Sorry, there was an error enhancing your prompt. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const copyToClipboard = async () => {
    if (enhancedPrompt) {
      await navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      enhancePrompt();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Prompt Enhancer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your simple prompts into detailed, professional descriptions optimized for stunning AI image generation
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              {/* Input Section */}
              <div className="mb-8">
                <label htmlFor="prompt-input" className="block text-lg font-semibold text-gray-900 mb-3">
                  Your Original Prompt
                </label>
                <div className="relative">
                  <textarea
                    id="prompt-input"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your image prompt here... (e.g., 'a cat sitting on a chair')"
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                    Ctrl + Enter to enhance
                  </div>
                </div>
              </div>

              {/* Enhance Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={enhancePrompt}
                  disabled={!inputPrompt.trim() || isEnhancing}
                  className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
                >
                  {isEnhancing ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                      Enhance Prompt
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Output Section */}
              {(enhancedPrompt || isEnhancing) && (
                <div className="border-t border-gray-100 pt-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-lg font-semibold text-gray-900">
                      Enhanced Prompt
                    </label>
                    {enhancedPrompt && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    {isEnhancing ? (
                      <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                          <p className="text-gray-600">Crafting your enhanced prompt...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-100">
                        <p className="text-gray-800 leading-relaxed">
                          {enhancedPrompt}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Be Specific</h3>
              <p className="text-gray-600 text-sm">
                The more specific your original prompt, the better the AI enhancement will be
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Use Keywords</h3>
              <p className="text-gray-600 text-sm">
                AI-powered enhancement adds professional terminology and technical details automatically
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Copy & Use</h3>
              <p className="text-gray-600 text-sm">
                Enhanced prompts are optimized for DALL-E, Midjourney, Stable Diffusion, and other AI tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;