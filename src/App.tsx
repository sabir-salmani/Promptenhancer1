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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          animation: 'gridMove 30s linear infinite reverse'
        }}></div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg shadow-green-500/25">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Prompt Enhancer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your simple prompts into detailed, professional descriptions optimized for stunning AI image generation
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="p-8">
              {/* Input Section */}
              <div className="mb-8">
                <label htmlFor="prompt-input" className="block text-lg font-semibold text-white mb-3">
                  Your Original Prompt
                </label>
                <div className="relative">
                  <textarea
                    id="prompt-input"
                    value={inputPrompt}
                    onChange={(e) => setInputPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your image prompt here... (e.g., 'a cat sitting on a chair')"
                    className="w-full h-32 p-4 border-2 border-gray-600 bg-gray-800/50 backdrop-blur-sm rounded-xl resize-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                    Ctrl + Enter to enhance
                  </div>
                </div>
              </div>

              {/* Enhance Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={enhancePrompt}
                  disabled={!inputPrompt.trim() || isEnhancing}
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-200 flex items-center gap-3"
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
                <div className="border-t border-gray-700 pt-8">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-lg font-semibold text-white">
                      Enhanced Prompt
                    </label>
                    {enhancedPrompt && (
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    {isEnhancing ? (
                      <div className="h-40 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700">
                        <div className="text-center">
                          <div className="animate-spin w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                          <p className="text-gray-300">Crafting your enhanced prompt...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-xl border-2 border-green-500/30 backdrop-blur-sm">
                        <p className="text-gray-100 leading-relaxed">
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
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-700">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Be Specific</h3>
              <p className="text-gray-300 text-sm">
                The more specific your original prompt, the better the AI enhancement will be
              </p>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-700">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Use Keywords</h3>
              <p className="text-gray-300 text-sm">
                AI-powered enhancement adds professional terminology and technical details automatically
              </p>
            </div>
            
            <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-700">
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Copy className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Copy & Use</h3>
              <p className="text-gray-300 text-sm">
                Enhanced prompts are optimized for DALL-E, Midjourney, Stable Diffusion, and other AI tools
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}

export default App;